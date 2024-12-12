'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useEffect, useState } from "react";

interface Schedule {
    id: string;
    mentorName: string;
    mentorId: string;
    dateTime: string;
    purpose: string;
    duration: string;
    details: string;
    accepted: string;
}

interface Mentor {
    id: string;
    userId: string;
    name: string;
    designation: string;
    aboutMentor: string;
    qualifications: string;
    experience: string;
    email: string;
    skills: string;
    totalMeetings: number;
    acceptedMeetings: number;
    deniedMeetings: number;
    schedule: Schedule[];
}

const MentorPage: React.FC = () => {
    const [mentorData, setMentorData] = useState<Mentor | null>(null);

    useEffect(() => {
        const fetchMentorData = async () => {
            try {
                const response = await fetch("/api/mentor/fetch");
                const data: Mentor = await response.json();
                setMentorData(data);
            } catch (error) {
                console.error("Failed to fetch mentor data", error);
            }
        };

        fetchMentorData();
    }, []);

    if (!mentorData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <Card>
                <CardHeader>
                    <CardTitle>{mentorData.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div>Total Meetings: {mentorData.totalMeetings}</div>
                        <div>Accepted Meetings: {mentorData.acceptedMeetings}</div>
                        <div>Denied Meetings: {mentorData.deniedMeetings}</div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MentorPage;
