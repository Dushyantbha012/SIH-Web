from flask import Flask, request, jsonify
import PyPDF2
import requests
from groq import Groq
import os

os.environ["TOKENIZERS_PARALLELISM"] = "false"

app = Flask(__name__)

class InterviewAssistant:
    def __init__(self, api_key, pdf_path):
        self.api_key = api_key
        self.client = Groq(api_key=api_key)
        self.resume = self.extract_text_from_pdf(pdf_path)

    def extract_text_from_pdf(self, pdf_path):
        text = ""
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text() + "\n"
        return text.strip()

    def generate_questions(self):
        prompt = f"Generate 5-10 concise and formal technical questions based on the following resume: {self.resume}"
        
        chat_completion = self.client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are an interviewer who asks only formal and concise questions."},
                {"role": "user", "content": prompt}
            ],
            model="llama3-8b-8192",
            max_tokens=150
        )
        
        return chat_completion.choices[0].message.content.strip().split('\n')

def download_pdf(url, save_path):
    response = requests.get(url)
    with open(save_path, 'wb') as f:
        f.write(response.content)

@app.route('/ask_questions', methods=['POST'])
def ask_questions():
    data = request.json
    pdf_url = data.get('pdf_url')
    
    if not pdf_url:
        return jsonify({"error": "PDF URL is required"}), 400

    # Save PDF from the URL
    pdf_path = 'temp_resume.pdf'
    download_pdf(pdf_url, pdf_path)

    api_key = "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" 
    assistant = InterviewAssistant(api_key, pdf_path)
    
    questions = assistant.generate_questions()
    
    os.remove(pdf_path)

    return jsonify({"questions": questions})

if __name__ == "__main__":
    app.run(debug=True)
