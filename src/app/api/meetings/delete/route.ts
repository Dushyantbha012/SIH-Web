import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { id } = await req.json();

        if (!id ) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        await db.meetings.delete({
            where: { id },  
        });

        return NextResponse.json({ message: 'Meeting status updated' });
    } catch (error) {
        console.error('Error updating meeting status:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}