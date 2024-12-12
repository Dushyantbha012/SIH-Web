"use client"

import { MeetingList } from "@/components/meetings-list"
import { HeroSection } from "./components/hero-section"
import { AnimatedGradient } from "./components/animated-gradient"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { motion } from "framer-motion"

async function getMeetings() {
  const res = await axios.get('/api/mentor/schedule')
  if (!res) {
    throw new Error('Failed to fetch meetings')
  }
  console.log(res.data)
  return res.data
}

export default function DashboardPage() {
  const [meetings, setMeetings] = useState<any[]>([])

  useEffect(() => {
    async function fetchMeetings() {
      try {
        const { meetings } = await getMeetings()
        setMeetings(meetings)
      } catch (error) {
        console.error('Error fetching meetings:', error)
      }
    }
    toast.promise(fetchMeetings(), {
      loading: "Loading meetings...",
      success: "Meetings loaded successfully!",
      error: "Error fetching meetings!"
    })
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedGradient className="opacity-20" />
      <div className="relative z-10">
        <HeroSection />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MeetingList meetings={meetings} />
        </motion.div>
      </div>
    </div>
  )
}

