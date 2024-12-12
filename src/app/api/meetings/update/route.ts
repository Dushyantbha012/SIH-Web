import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { id, accepted } = await req.json();

        if (!id || !accepted) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const updatedMeeting = await db.meetings.update({
            where: { id },
            data: { accepted },
        });

        return NextResponse.json({ message: 'Meeting status updated', meeting: updatedMeeting });
    } catch (error) {
        console.error('Error updating meeting status:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}