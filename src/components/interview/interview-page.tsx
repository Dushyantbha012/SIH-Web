'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, SkipForward, Send, Play } from 'lucide-react';
import axios from 'axios';
import Typewriter from 'react-ts-typewriter';
import FeedbackComponent from './feedback-component';
interface AnalysisResult {
    question: string;
    transcript: string;
    feedback: string;
}
const analysisResultsTest: AnalysisResult[] = [
    {
        "feedback": "Here's an evaluation of the response:\n\n**Score: 6/10**\n\n**Strengths:** \n\n* The response provides a clear and concise definition of React and Next.js, which shows that the candidate has some understanding of the technologies.\n* The candidate mentions that Next.js is a full-stack framework, which indicates that they have a basic idea of its capabilities.\n\n**Weaknesses:**\n\n* The response is very brief and lacks depth. A simple definition does not provide a comprehensive understanding of the difference between React and Next.js.\n* There is no connection made between the candidate's knowledge of the difference between React and Next.js and their work experience. The candidate is asked to provide an example of how they applied this knowledge, but instead, they",
        "question": "1. Can you explain the difference between NextJS and React, and how did you apply this knowledge in your work experience?",
        "transcript": "React is a front end functional UI library, whereas Next JS is a full stack framework built upon React JS."
    },
    {
        "feedback": "Here is my evaluation and feedback on the response:\n\n**Strengths:**\n\n* The candidate mentions using a specific authentication service, Clerk, which shows they are familiar with secure login integration.\n* They briefly mention the specific services integrated (Google and GitHub).\n\n**Weaknesses:**\n\n* The response is extremely brief and lacks detail. The candidate does not explain how they implemented secure login or what technical stack they used.\n* There is no context provided about the Property Listing System project, making it difficult to understand the scope and requirements of the project.\n\n**Constructive Feedback:**\n\n* In your response, please provide more specific details about how you implemented secure login with Google and GitHub. This could include technical details about the authentication flow, any challenges you faced",
        "question": "2. How did you implement secure login with Google and GitHub in the Property Listing System project, and what technical stack did you use?",
        "transcript": "I use Clerk authentication to integrate Google Secure login and GitHub secure login in my property listing system project."
    },
    {
        "feedback": "Response Evaluation:\n\nThe response attempts to highlight the candidate's experience with Socket.io, but it falls short in providing a clear and concise answer. Here's a breakdown of the feedback:\n\nStrengths:\n\n* The candidate mentions Socket.io, which shows they are familiar with the technology.\n\nWeaknesses:\n\n* The response is vague and lacks specific details about their experience with Socket.io. The candidate jumps from discussing Socket.io to React, without addressing how they used Socket.io in the Real-time Chatroom feature of the Realm project.\n* The sentence structure is unclear, and the language is difficult to understand. For example, what does \"norm manipulation of the React\" mean? It seems like the candidate is trying to use technical jargon but is not effectively communicating",
        "question": "3. What is your experience with Socket.io, and how did you use it in the Real-time Chatroom feature of the Realm project?",
        "transcript": "Socket IO provides us with web sockets which detects the change in the state of data and modifies it in the norm manipulation of the React."
    },
    {
        "feedback": "Here's the breakdown of the response with constructive feedback:\n\n**Content (4.5/5)**\n\n* The candidate is attempting to address the question, but their response is quite short and doesn't provide a clear explanation of the differences between Prisma and MongoDB.\n* They do mention the core capabilities of each technology, but it's not specific to the Rentora project.\n* More context and examples would be helpful to better understand the candidate's thought process and the reasons behind their choice.\n\n**Technical Accuracy (3.5/5)**\n\n* The candidate correctly identifies the capabilities of MongoDB as a NoSQL database and Prisma as an ORM.\n* However, they seem to imply that Prisma is used to communicate between the Next.js app and",
        "question": "4. Can you describe the difference between Prisma and MongoDB in the context of the Rentora project, and how did you decide which one to use?",
        "transcript": "Mongo DB is a no SQL database used to store data whereas Prisma is a ORM which is used to communicate between my next JS app and Momba DB."
    }
];
export default function InterviewClient() {
    const [isInterviewStarted, setIsInterviewStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState("");
    const [progress, setProgress] = useState(0);
    const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
    const [feedback, setFeedback] = useState("");
    const [questions, setQuestions] = useState<string[]>([]);
    const [responses, setResponses] = useState<{ question: string; transcript: string }[]>([]);
    const totalQuestions = 5; // Adjust this if the total number of questions changes
    const answeredQuestions = useRef(0);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        if (isInterviewStarted) {
            fetchQuestions(); // Fetch questions when the interview starts
        }
    }, [isInterviewStarted]);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('/api/interview/questions');
            const data = await response.data;
            const refinedQuestions = data.questions.filter((question: string) =>
                question.trim() !== '' && !question.startsWith('Here are')
            );
            setQuestions(refinedQuestions); // Update state with fetched questions
            setCurrentQuestion(refinedQuestions[answeredQuestions.current]); // Set the first question
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const startInterview = () => {
        setIsInterviewStarted(true);
        answeredQuestions.current = 0;
        setProgress(0);
        setFeedback("");
        setResponses([]); // Reset responses at the start of the interview
    };

    const startRecording = () => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            console.error("SpeechRecognition API not supported in this browser.");
            alert("SpeechRecognition API is not supported in this browser. Please use Google Chrome for the best experience.");
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsRecording(true);
        };

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');
            setTranscription(transcript);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            switch (event.error) {
                case 'network':
                    alert("Network error occurred. Please check your internet connection and try again.");
                    break;
                case 'no-speech':
                    alert("No speech was detected. Please try again.");
                    break;
                case 'aborted':
                    alert("Speech recognition was aborted. Please try again.");
                    break;
                case 'audio-capture':
                    alert("No microphone was found. Ensure that a microphone is installed and that microphone settings are configured correctly.");
                    break;
                case 'not-allowed':
                case 'service-not-allowed':
                    alert("Permission to use the microphone is denied. Please allow microphone access and try again.");
                    break;
                case 'bad-grammar':
                    alert("There was an error in the speech recognition grammar.");
                    break;
                case 'language-not-supported':
                    alert("The specified language is not supported.");
                    break;
                default:
                    alert("An unknown error occurred. Please try again.");
                    break;
            }
        };

        recognition.onend = () => {
            setIsRecording(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            console.log("Transcription:", transcription);
        }
    };

    const submitAnswer = async () => {
        // Save the transcription with the current question
        setResponses(prevResponses => [
            ...prevResponses,
            { question: currentQuestion, transcript: transcription } // Corrected here
        ]);

        answeredQuestions.current += 1;
        setProgress((answeredQuestions.current / totalQuestions) * 100);

        if (answeredQuestions.current < questions.length) {
            setCurrentQuestion(questions[answeredQuestions.current]); // Move to the next question
            setTranscription("");
        } else {
            await endInterview(); // Await end interview for analysis
        }
    };

    const skipQuestion = async () => {
        answeredQuestions.current += 1; // Increment the counter to move to the next question
        setProgress((answeredQuestions.current / totalQuestions) * 100);

        if (answeredQuestions.current < questions.length) {
            setCurrentQuestion(questions[answeredQuestions.current]); // Skip to the next question
            setTranscription("");
        } else {
            await endInterview(); // Await end interview for analysis
        }
    };

    const endInterview = async () => {
        setIsInterviewStarted(false);
        setCurrentQuestion("");
        setTranscription("");
        console.log({ responses });
        // Send the collected responses for analysis
        try {
            // Ensure you send responses in the format the backend expects
            const analysisResponse = await axios.post('/api/interview/analyze', { responses });
            console.log('Analysis result:', analysisResponse.data.analysis_results);
            setAnalysisResults(analysisResponse.data.analysis_results);
        } catch (error) {
            console.error('Error sending responses for analysis:', error);
            setFeedback("An error occurred while analyzing your responses.");
        }
    };
    let bodyContent = (
        <div>
            <div className="max-w-2xl mx-auto space-y-6">
                {!isInterviewStarted ? (
                    <Card className="max-w-lg mx-auto">
                        <CardContent className="p-6 text-center">
                            <h2 className="text-2xl font-bold mb-4">Ready to start your interview?</h2>
                            <p className="mb-6 text-gray-600">Click the button below to begin. You'll be presented with a series of questions to answer.</p>
                            <Button onClick={startInterview} className="w-full">
                                <Play className="mr-2 h-4 w-4" /> Start Interview
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <Progress value={progress} className="w-full" />

                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4">
                                    <Typewriter text={currentQuestion} />
                                </h2>
                                {transcription && (
                                    <div className="bg-gray-100 p-4 rounded-md mb-4">
                                        <p className="text-sm text-gray-700"><Typewriter text={transcription} /></p>
                                    </div>
                                )}
                                <div className="flex justify-between items-center space-x-10">
                                    <Button
                                        onClick={isRecording ? stopRecording : startRecording}
                                        variant={isRecording ? "destructive" : "default"}
                                        className="flex items-center"
                                    >
                                        {isRecording ? (
                                            <>
                                                <MicOff className="mr-2 h-4 w-4" /> Stop Recording
                                            </>
                                        ) : (
                                            <>

                                                <Mic className="mr-2 h-4 w-4" /> Start Recording
                                            </>
                                        )}
                                    </Button>
                                    <div className="space-x-2">
                                        <Button onClick={submitAnswer} disabled={!transcription}>
                                            <Send className="mr-2 h-4 w-4" /> Submit
                                        </Button>
                                        <Button onClick={skipQuestion} variant="outline">
                                            <SkipForward className="mr-2 h-4 w-4" /> Skip
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </>
                )}
            </div>
        </div>
    )
    if (analysisResults.length > 0) {
        bodyContent = (
            <FeedbackComponent apiResponse={analysisResults} />
        );
    }
    return bodyContent;
}
