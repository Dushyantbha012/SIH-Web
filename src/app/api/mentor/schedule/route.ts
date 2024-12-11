import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
    try {
        console.log("hello")
        const { mentorId, dateTime, mentorName } = await req.json();

        if (!mentorId || !dateTime || !mentorName) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const meetingDateTime = new Date(dateTime);

        // Create a new meeting entry
        const newMeeting = await db.meetings.create({
            data: {
                mentorId: mentorId,
                dateTime: meetingDateTime,
                mentorName: mentorName
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
    const mentor = await db.mentor.findUnique({
        where: {
            userId: mentorId
        }
    });
    if (!mentor) {
        return NextResponse.json({ error: 'Mentor not found' }, { status: 494 });
    }
    console.log("mentorId: ",mentorId)
    if (!mentorId) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
        const meetings = await db.meetings.findMany({
            where: { mentorId: mentor.id }
        });

        if (!meetings) {
            return NextResponse.json({ error: 'Mentor not found' }, { status: 408 });
        }

        return NextResponse.json({ meetings }, { status: 200 });
    } catch (error) {
        console.error('Error fetching mentor schedule:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}