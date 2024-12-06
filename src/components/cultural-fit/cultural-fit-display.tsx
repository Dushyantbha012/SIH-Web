import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Emotion {
    name: string;
    value: number;
}

interface CulturalFitAnalysisProps {
    emotions: Emotion[][];
}

export function CulturalFitAnalysis({ emotions }: CulturalFitAnalysisProps) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Emotion Analysis',
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                display: false,
            },
        },
    };

    const allEmotions = Array.from(new Set(emotions.flatMap(segment => segment.map(e => e.name))));

    const chartData = {
        labels: emotions.map((_, index) => `Segment ${index + 1}`),
        datasets: allEmotions.map((emotion, index) => ({
            label: emotion,
            data: emotions.map(segment => {
                const emotionData = segment.find(e => e.name === emotion);
                return emotionData ? emotionData.value : 0;
            }),
            backgroundColor: `hsl(${index * 30}, 70%, 50%)`,
        })),
    };

    return (
        <Card className="w-full mt-6">
            <CardHeader>
                <CardTitle>Cultural Fit Analysis</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="w-full h-[400px]">
                    <Bar options={options} data={chartData} />
                </div>
            </CardContent>
        </Card>
    );
}

