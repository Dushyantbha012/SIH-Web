import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import axios from 'axios';

import { RedisManager } from '@/lib/redis/RedisManager';
import { GET_QUESTIONS } from '@/lib/redis/types';


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
        const resume = userData.resume;
        const res = await RedisManager.getInstance().sendAndAwait({
            type: GET_QUESTIONS,
            data: {
              resume: resume,
            },
          })
        return NextResponse.json({ questions: res.payload });



    } catch (error) {
        console.error('Error fetching questions:', error);
        return NextResponse.json({ error: 'An error occurred while fetching questions.' }, { status: 500 });
    }

}
