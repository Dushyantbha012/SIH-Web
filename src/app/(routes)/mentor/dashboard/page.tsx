"use client"
import { MeetingList } from "@/components/meetings-list"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

async function getMeetings() {
    const res = await axios.get('/api/mentor/schedule'); 
    if (!res) {
        throw new Error('Failed to fetch meetings')
    }
    console.log(res.data)
    return res.data
}

export default function DashboardPage() {
   const [meetings, setMeetings] = useState<any[]>([]);
    useEffect(() => {
        async function fetchMeetings() {
            try {
                const { meetings } = await getMeetings()
                setMeetings(meetings)
            } catch (error) {
                console.error('Error fetching meetings:', error);
            }
        }
        toast.promise(fetchMeetings(), {
            loading: "Loading meetings...",
            success: "Meetings loaded successfully!",
            error: "Error fetching meetings!"
          });
    }, []);
    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Mentor Dashboard</h1>
            <MeetingList meetings={meetings} />
        </div>
    )
}

