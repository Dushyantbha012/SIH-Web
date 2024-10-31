import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
    try {
        // Instead of extracting question and transcript directly, expect responses
        const { responses } = await request.json();

        // Sending responses to the Python backend as an array
        const response = await axios.post('http://127.0.0.1:5000/analyze_responses', {
            responses,  // Wrap responses correctly
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error analyzing responses:', error);
        return NextResponse.json({ error: 'Failed to analyze responses' }, { status: 500 });
    }
}
