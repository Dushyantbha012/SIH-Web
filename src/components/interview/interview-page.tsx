'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, SkipForward, Send, Play } from 'lucide-react'

const generateQuestion = () => {
    const questions = [
        "Tell me about yourself.",
        "What are your greatest strengths?",
        "Where do you see yourself in 5 years?",
        "Why should we hire you?",
        "Describe a challenging work situation and how you overcame it."
    ]
    return questions[Math.floor(Math.random() * questions.length)]
}

export default function InterviewClient() {
    const [isInterviewStarted, setIsInterviewStarted] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState("")
    const [isRecording, setIsRecording] = useState(false)
    const [transcription, setTranscription] = useState("")
    const [progress, setProgress] = useState(0)
    const [feedback, setFeedback] = useState("")

    const totalQuestions = 5
    const answeredQuestions = useRef(0)
    const recognitionRef = useRef<SpeechRecognition | null>(null)

    useEffect(() => {
        if (isInterviewStarted && currentQuestion === "") {
            setCurrentQuestion(generateQuestion())
        }
    }, [isInterviewStarted, currentQuestion])

    const startInterview = () => {
        setIsInterviewStarted(true)
        answeredQuestions.current = 0
        setProgress(0)
        setFeedback("")
    }

    const startRecording = () => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            console.error("SpeechRecognition API not supported in this browser.")
            alert("SpeechRecognition API is not supported in this browser. Please use Google Chrome for the best experience.")
            return
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()

        recognition.continuous = false
        recognition.interimResults = true
        recognition.lang = 'en-US'

        recognition.onstart = () => {
            setIsRecording(true)
        }

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('')
            setTranscription(transcript)
        }

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error)
            switch (event.error) {
                case 'network':
                    alert("Network error occurred. Please check your internet connection and try again.")
                    break
                case 'no-speech':
                    alert("No speech was detected. Please try again.")
                    break
                case 'aborted':
                    alert("Speech recognition was aborted. Please try again.")
                    break
                case 'audio-capture':
                    alert("No microphone was found. Ensure that a microphone is installed and that microphone settings are configured correctly.")
                    break
                case 'not-allowed':
                case 'service-not-allowed':
                    alert("Permission to use the microphone is denied. Please allow microphone access and try again.")
                    break
                case 'bad-grammar':
                    alert("There was an error in the speech recognition grammar.")
                    break
                case 'language-not-supported':
                    alert("The specified language is not supported.")
                    break
                default:
                    alert("An unknown error occurred. Please try again.")
                    break
            }
        }

        recognition.onend = () => {
            setIsRecording(false)
        }

        recognitionRef.current = recognition
        recognition.start()
    }

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop()
            console.log("Transcription:", transcription)
        }
    }

    const submitAnswer = () => {
        answeredQuestions.current += 1
        setProgress((answeredQuestions.current / totalQuestions) * 100)

        if (answeredQuestions.current < totalQuestions) {
            setCurrentQuestion(generateQuestion())
            setTranscription("")
        } else {
            endInterview()
        }
    }

    const skipQuestion = () => {
        setCurrentQuestion(generateQuestion())
        setTranscription("")
    }

    const endInterview = () => {
        setIsInterviewStarted(false)
        setCurrentQuestion("")
        setTranscription("")
        setFeedback("Great job! You demonstrated strong communication skills and provided relevant examples. Consider elaborating more on your technical skills in future interviews.")
    }

    return (
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
                            <h2 className="text-xl font-semibold mb-4">{currentQuestion}</h2>
                            {transcription && (
                                <div className="bg-gray-100 p-4 rounded-md mb-4">
                                    <p className="text-sm text-gray-700">{transcription}</p>
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

                    {feedback && (
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-2">Interview Feedback</h3>
                                <p className="text-gray-700">{feedback}</p>
                            </CardContent>
                        </Card>
                    )}
                </>
            )}
        </div>
    )
}
