
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import axios from 'axios';

export default async function getQuestions() {
    const {userId} = auth();
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
            throw new Error('No resume URL found for the user.');
        }

        const response = await axios.post('http://127.0.0.1:5000/ask_questions', {
            pdf_url: userData.resume
        });

        return response.data.questions;

    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
}
