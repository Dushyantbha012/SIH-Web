"use client";

import React, { useState, useRef } from "react";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { OurFileRouter } from "@/app/api/core";
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff,Send, Play  } from 'lucide-react'
import Typewriter from 'react-ts-typewriter'
import useLoading from "@/hooks/useLoading";
import VoiceAnimation from "./voice-animation";
const { useUploadThing } = generateReactHelpers<OurFileRouter>();

const CulturalFitClient = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const audioRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const { startUpload } = useUploadThing("audioUploader");
    const [isInterviewStarted, setIsInterviewStarted] = useState(false)
    const [progress, setProgress] = useState(0)
    const loading = useLoading();
    const startRecording = () => {
        setIsInterviewStarted(true)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    const mediaRecorder = new MediaRecorder(stream);
                    audioRef.current = mediaRecorder;
                    audioChunksRef.current = [];

                    mediaRecorder.ondataavailable = (event) => {
                        audioChunksRef.current.push(event.data);
                    };

                    mediaRecorder.onstop = () => {
                        const audioBlob = new Blob(audioChunksRef.current, {
                            type: "audio/wav",
                        });
                        const audioFile = new File([audioBlob], "audio.wav", {
                            type: "audio/wav",
                        });
                        setAudioFile(audioFile);
                        console.log("Recording finished, file URL:", URL.createObjectURL(audioBlob));
                    };

                    mediaRecorder.start();
                    setIsRecording(true);
                })
                .catch((error) => {
                    console.error("Error accessing microphone:", error);
                });
        } else {
            console.error("Your browser does not support audio recording.");
        }
    };

    // Stop the recording
    const stopRecording = () => {
        if (audioRef.current && isRecording) {
            audioRef.current.stop();
            setIsRecording(false);

        }
        console.log("Recording stopped", audioFile)
    };

    const uploadAudio = async (file: File) => {
        try {
            const response = await startUpload([file]);
            
            console.log("Upload successful:", response);

            if (response && response.length > 0) {
                const fileUrl = response[0].url;
                console.log("Upload successful:", fileUrl);
                setAudioUrl(fileUrl);
            }
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-2xl shadow-xl">
                <CardContent className="p-6">
                    <AnimatePresence mode="wait">
                        {!isInterviewStarted && !loading.isOpen ? (
                            <motion.div
                                key="start"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="text-center"
                            >
                                <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready for Your Cultural Fit Analysis?</h2>
                                <p className="mb-6 text-gray-600">Click the button below to begin. You'll be presented with a series of questions to answer.</p>
                                <Button onClick={startRecording} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                                    <Play className="mr-2 h-5 w-5" /> Start Interview
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="interview"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Progress value={progress} className="w-full mb-6" />
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                    <Typewriter text={"Tell me about yourself"} />
                                </h2>
                                
                                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                    <div className="flex items-center space-x-4">
                                        <Button
                                            onClick={isRecording ? stopRecording : startRecording}
                                            variant={isRecording ? "destructive" : "default"}
                                            className="flex items-center"
                                        >
                                            {isRecording ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
                                            {isRecording ? 'Stop' : 'Start'} Recording
                                        </Button>
                                        {isRecording && <div><VoiceAnimation /></div>}
                                    </div>
                                    {audioFile && !isRecording &&
                                        <div className="flex space-x-2">
                                            <Button onClick={() => { uploadAudio(audioFile) }} disabled={!audioFile} className="bg-green-500 hover:bg-green-600 text-white">
                                                <Send className="mr-2 h-4 w-4" /> Submit
                                            </Button>
                                        </div>
                                    }
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
};

export default CulturalFitClient;