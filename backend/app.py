from flask import Flask, request, jsonify
import PyPDF2
from groq import Groq
from controllers.verifyUrl import is_valid_url 
from utils.download_pdf import download_pdf
import os
os.environ["TOKENIZERS_PARALLELISM"] = "false"
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from utils.secure_api_call import exponential_backoff_request
from similarity_score import pdf_to_text, calculate_similarity_score
from resume_builder import resume_builder
from recommendation import generate_recommendation
import requests
from pydub import AudioSegment
import speech_recognition as sr
import asyncio
from hume import HumeStreamClient
from hume.models.config import ProsodyConfig

app = Flask(__name__)
limiter = Limiter(get_remote_address, app=app, default_limits=["200 per day", "50 per hour"])
class InterviewAssistant:
    def __init__(self, api_key, pdf_path=None):
        self.api_key = api_key
        self.client = Groq(api_key=api_key)
        
        if pdf_path: 
            self.resume = self.extract_text_from_pdf(pdf_path)
        else:
            self.resume = ""  

    def extract_text_from_pdf(self, pdf_path):
        text = ""
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text() + "\n"
        return text.strip()

    def generate_questions(self):
        prompt = f"Generate 5-10 concise and formal technical questions based on the following resume: {self.resume}"
        
        def api_call():
            return self.client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are an interviewer who asks only formal and concise questions."},
                    {"role": "user", "content": prompt}
                ],
                model="llama3-8b-8192",
                max_tokens=150
            )

        chat_completion = exponential_backoff_request(api_call) 
        return chat_completion.choices[0].message.content.strip().split('\n')

    def analyze_response(self, question, transcript):
        prompt = f"Based on the question: '{question}', evaluate the response: '{transcript}' and provide constructive feedback."
        
        def api_call():
            return self.client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are an evaluator who gives constructive feedback on interview responses."},
                    {"role": "user", "content": prompt}
                ],
                model="llama3-8b-8192",
                max_tokens=150
            )

        chat_completion = exponential_backoff_request(api_call) 
        return chat_completion.choices[0].message.content.strip()

@app.route('/ask_questions', methods=['POST'])
@limiter.limit("10 per minute")
def ask_questions():
    data = request.json
    pdf_url = data.get('pdf_url')

    if not pdf_url or not is_valid_url(pdf_url):
        return jsonify({"error": "Invalid or missing PDF URL"}), 400
    
    pdf_path = 'temp_resume.pdf'
    try:
        download_result = download_pdf(pdf_url, pdf_path)
        if "error" in download_result:
            return jsonify(download_result), 400

        api_key = "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" 
        assistant = InterviewAssistant(api_key, pdf_path)
    
        questions = assistant.generate_questions()
        return jsonify({"questions": questions})
    finally:
        if os.path.exists(pdf_path):
            os.remove(pdf_path)

@app.route('/analyze_responses', methods=['POST'])
def analyze_responses():
    data = request.json
    responses = data.get('responses')  

    if not responses:
        return jsonify({"error": "Responses data is required"}), 400

    api_key = "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" 
    assistant = InterviewAssistant(api_key, pdf_path=None)

    analysis_results = []  

    for item in responses:
        question = item.get('question')
        transcript = item.get('transcript')

        if not question or not transcript:
            return jsonify({"error": "Both question and transcript are required for each response"}), 400

        feedback = assistant.analyze_response(question, transcript)

        analysis_result = {
            "question": question,
            "transcript": transcript,
            "feedback": feedback
        }
        analysis_results.append(analysis_result)

    return jsonify({"analysis_results": analysis_results})

@app.route('/similarity-score', methods=['POST'])
def similarity_score():
    data = request.json
    pdf_url = data.get('pdf_url')
    job_description = data.get('job_description')
    if not pdf_url:
        return jsonify({'error': 'PDF URL is required'}), 400
    pdf_path = 'downloaded_resume.pdf'
    
    if not download_pdf(pdf_url, pdf_path):
        return jsonify({'error': 'Failed to download PDF'}), 500
    resume_text = pdf_to_text(pdf_path)
    scores = calculate_similarity_score(resume_text,job_description)

    os.remove(pdf_path)

    return jsonify(scores)

@app.route('/resume-build', methods=['POST'])
def build_resume():
    data = request.json
    resume_url = data.get('resume_url')
    job_description = data.get('job_description')
    pdf_path = 'downloaded_resume.pdf'
    
    if not download_pdf(resume_url, pdf_path):
        return jsonify({'error': 'Failed to download PDF'}), 500
    resume_text = pdf_to_text(pdf_path)
    if not resume_text or not job_description:
        return jsonify({'error': 'Both resume text and job description are required.'}), 400

    generated_resume = resume_builder(resume_text, job_description)
    return jsonify({'generated_resume': generated_resume})

@app.route('/recommendation', methods=['POST'])
def recommendation():
    data = request.json
    resume_url = data.get('resume_url')
    job_description = data.get('job_description')
    pdf_path = 'downloaded_resume.pdf'
    if not resume_url or not job_description:
        return jsonify({'error': 'Both resume URL and job description are required.'}), 400
    if not download_pdf(resume_url, pdf_path):
        return jsonify({'error': 'Failed to download PDF'}), 500
    resume_text = pdf_to_text(pdf_path)
    try:
        response = generate_recommendation(resume_text, job_description)
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/cultural-fit', methods=['POST'])
def cultural_fit():
    data = request.get_json()
    audio_url = data.get('audioUrl')
    if not audio_url:
        return jsonify({'error': 'No audio URL provided'}), 400

    # Download the audio file
    audio_response = requests.get(audio_url)
    if audio_response.status_code != 200:
        return jsonify({'error': 'Failed to download audio file'}), 400

    # Determine the audio format from Content-Type
    content_type = audio_response.headers.get('Content-Type')
    print('Content-Type:', content_type)


    audio_filename = 'output.wav'
    with open(audio_filename, 'wb') as f:
        f.write(audio_response.content)

    if os.path.getsize(audio_filename) == 0:
        os.remove(audio_filename)
        return jsonify({'error': 'Audio file is empty'}), 400
    try:
        audio = AudioSegment.from_file(audio_filename)
    except Exception as e:
        print(f'Error loading audio file: {e}')
        os.remove(audio_filename)
        return jsonify({'error': 'Failed to load audio file'}), 500

    if audio.rms == 0:
        os.remove(audio_filename)
        return jsonify({'error': 'Audio file contains only silence'}), 400
    segment_length = len(audio) // 6 
    audio_segments = [audio[i * segment_length:(i + 1) * segment_length] for i in range(6)]
    emotions = []
    text_segments = []

    # Speech-to-text for full audio
    def stt_full():
        recognizer = sr.Recognizer()
        try:
            with sr.AudioFile(audio_filename) as source:
                audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data)
            text_segments.append(f"Complete answer: {text}")
        except Exception as e:
            print(f"Error during speech recognition for full audio: {e}")
            text_segments.append("Complete answer: [Error processing audio]")

    # Process each segment
    async def process_segment(segment, index):
        segment_filename = f"output_segment_{index}.wav"
        segment.export(segment_filename, format="wav")

        # Check if segment is silent
        if segment.rms == 0:
            print(f"Segment {index} contains only silence.")
            emotions.append(["No emotions detected"] * 3)
            text_segments.append(f"Text for segment {index}: [Silence]")
            os.remove(segment_filename)
            return

        # Hume API for emotions
        try:
            hume_api_key = 'CJffluuY10Z47dNMZSMs4WQ7eBparPq0XYWJduyczGMk9OQO'
            client = HumeStreamClient(hume_api_key)
            config = ProsodyConfig()

            async with client.connect([config]) as socket:
                result = await socket.send_file(segment_filename)
                prediction = result['prosody']['predictions'][0]["emotions"]

            top_emotions = sorted(prediction, key=lambda x: x['score'], reverse=True)[:3]
            emotions.append([f"{e['name']}: {e['score']}" for e in top_emotions])
        except Exception as e:
            print(f"Error during emotion analysis for segment {index}: {e}")
            emotions.append(["Error detecting emotions"] * 3)

        # Speech-to-text for the segment
        try:
            recognizer = sr.Recognizer()
            with sr.AudioFile(segment_filename) as source:
                audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data)
            text_segments.append(f"Text for segment {index}: {text}")
        except Exception as e:
            print(f"Error during speech recognition for segment {index}: {e}")
            text_segments.append(f"Text for segment {index}: [Error processing audio]")

        os.remove(segment_filename)

    # Asynchronous processing of segments
    async def process_all_segments():
        tasks = [process_segment(seg, i) for i, seg in enumerate(audio_segments)]
        await asyncio.gather(*tasks)

    try:
        asyncio.run(process_all_segments())
        stt_full()
    except Exception as e:
        print(f"Error during asynchronous processing: {e}")

    # Generate prompt for Groq API
    question = "What is your favorite programming language?"
    prompt = f"""
You have to judge the user's answer according to what they have spoken (text) and how they have spoken (emotions). The user does not know that the text has been divided into segments so just give a summary, give tips to the user about where and how they can improve. Then generate a score out of 10 for the user's response.

When you have judged it, then create a suitable response to the question with you as the person being interviewed.

question : {question}

{text_segments[-1]}

{text_segments[0]}
{text_segments[1]}
{text_segments[2]}
{text_segments[3]}
{text_segments[4]}
{text_segments[5]}

Top 3 emotions for segment 0:
{emotions[0][0]}
{emotions[0][1]}
{emotions[0][2]}

Top 3 emotions for segment 1:
{emotions[1][0]}
{emotions[1][1]}
{emotions[1][2]}

Top 3 emotions for segment 2:
{emotions[2][0]}
{emotions[2][1]}
{emotions[2][2]}

Top 3 emotions for segment 3:
{emotions[3][0]}
{emotions[3][1]}
{emotions[3][2]}

Top 3 emotions for segment 4:
{emotions[4][0]}
{emotions[4][1]}
{emotions[4][2]}

Top 3 emotions for segment 5:
{emotions[5][0]}
{emotions[5][1]}
{emotions[5][2]}
"""

    # Groq API for generating the response
    try:
        groq_api_key = "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"
        client = Groq(api_key=groq_api_key)
        chat_completion = client.chat.completions.create(
            messages=[{"role": "system", "content": prompt}],
            model="llama-3.1-8b-instant",
        )
        response_text = chat_completion.choices[0].message.content
    except Exception as e:
        print(f"Error during Groq API call: {e}")
        response_text = "Error generating response"

    os.remove(audio_filename)
    for i in range(len(emotions)) :
        print(f"Top 3 emotions for segment {i+1} :")
        print(emotions[i][0])
        print(emotions[i][1])
        print(emotions[i][2]+"\n")

    return jsonify({'result': response_text , 'emotions': emotions})

if __name__ == "__main__":
    app.run(debug=True)