'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarIcon, UserIcon } from 'lucide-react'
import { format } from 'date-fns'
interface Meeting {
    id: string
    mentorName: string
    userName: string
    mentorId: string
    dateTime: string
}

export function MeetingList({ meetings }: { meetings: Meeting[] }) {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Your Upcoming Meetings</h2>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {meetings.map((meeting, index) => (
                    <motion.div
                        key={meeting.id}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="mb-4">
                            <CardHeader>
                                <CardTitle className="text-xl">Meeting at : </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center mb-2">
                                    <CalendarIcon className="mr-2" />
                                    <span>{format(new Date(meeting.dateTime), 'dd/MM/yyyy, hh:mm:ss a')}</span>
                                </div>
                                
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

