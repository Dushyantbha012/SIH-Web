"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import InterviewModal from './interview-modal'
import InsightsModal from './insights-modal'

export function InterviewPageComponent() {
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false)
  const [isInsightsModalOpen, setIsInsightsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">AI Interview Assistant</h1>
      <div className="space-x-4">
        <Button 
          onClick={() => setIsInterviewModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Start Interview
        </Button>
        <Button 
          onClick={() => setIsInsightsModalOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          View Insights
        </Button>
      </div>
      {isInterviewModalOpen && <InterviewModal onClose={() => setIsInterviewModalOpen(false)} />}
      {isInsightsModalOpen && <InsightsModal onClose={() => setIsInsightsModalOpen(false)} />}
    </div>
  )
}