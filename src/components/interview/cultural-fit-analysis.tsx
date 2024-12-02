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
            y: {
                beginAtZero: true,
                max: 1,
            },
        },
    };

    const chartData = {
        labels: emotions[0].map(emotion => emotion.name),
        datasets: emotions.map((segment, index) => ({
            label: `Segment ${index + 1}`,
            data: segment.map(emotion => emotion.value),
            backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
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
