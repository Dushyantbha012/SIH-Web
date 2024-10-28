import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import axios from 'axios';

export async function GET() {
    const { userId } = auth();

    try {
        const userData = await db.userData.findFirst({
            where: {
                //@ts-ignore
                userId: userId,
                complete: true
            },
            select: {
                resume: true
            }
        });

        if (!userData || !userData.resume) {
            return NextResponse.json({ error: 'No resume URL found for the user.' }, { status: 404 });
        }

        const response = await axios.post('http://127.0.0.1:5000/ask_questions', {
            pdf_url: userData.resume
        });

        return NextResponse.json({ questions: response.data.questions });

    } catch (error) {
        console.error('Error fetching questions:', error);
        return NextResponse.json({ error: 'An error occurred while fetching questions.' }, { status: 500 });
    }
}
