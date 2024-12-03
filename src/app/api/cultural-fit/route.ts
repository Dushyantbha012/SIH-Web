import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { audioUrl } = await req.json();

        const response = await fetch('http://127.0.0.1:5000/cultural-fit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ audioUrl }),
        });

        if (!response.ok) {
            throw new Error('Failed to analyze audio');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in cultural-fit API route:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

