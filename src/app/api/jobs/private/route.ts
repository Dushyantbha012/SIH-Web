import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const govJobListings = await db.joblisting.findMany({
            where: {
                organization: 'Private',
            },
        });
        return NextResponse.json(govJobListings);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        
        return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
    }

}
