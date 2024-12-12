import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { mentorId, dateTime, mentorName, purpose, estimatedTime, details } = await req.json();

        if (!mentorId || !dateTime || !mentorName || !purpose) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const meetingDateTime = new Date(dateTime);

        const newMeeting = await db.meetings.create({
            data: {
                mentorId: mentorId,
                dateTime: meetingDateTime,
                mentorName: mentorName,
                purpose,
                duration: estimatedTime,
                details,
                accepted: "In Progress"
            },
        });

        return NextResponse.json({ message: 'Meeting confirmed', meeting: newMeeting });
    } catch (error) {
        console.error('Error scheduling meeting:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const user = await currentUser();
    const mentorId = user!.id;

    try {
        const mentor = await db.mentor.findUnique({
            where: {
                userId: mentorId
            }
        });

        if (!mentor) {
            return NextResponse.json({ error: 'Mentor not found' }, { status: 404 });
        }

        const meetings = await db.meetings.findMany({
            where: {
                mentorId: mentor.id
            }
        });

        return NextResponse.json({ meetings });
    } catch (error) {
        console.error('Error fetching mentor schedule:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}