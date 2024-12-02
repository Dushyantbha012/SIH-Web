import { NextResponse } from 'next/server';
import axios from 'axios';

// Updated API route to handle the `audioData` with question and audioUrl
export async function POST(req: Request) {
    try {
        const audioData = await req.json();

        // Validate incoming data
        if (!Array.isArray(audioData) || audioData.some(item => !item.question || !item.audioUrl)) {
            return NextResponse.json(
                { error: 'Invalid data structure. Each item must have a "question" and "audioUrl".' },
                { status: 400 }
            );
        }

        // Send data to the Python backend
        const response = await axios.post('http://localhost:5000/cultural-fit', audioData, {
            headers: { 'Content-Type': 'application/json' },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error in /api/cultural-fit route:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
