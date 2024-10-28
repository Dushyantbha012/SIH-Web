import InterviewClient from "@/components/interview/interview-page";


export default function InterviewPage() {
    return (
        <div className="mx-auto min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">Interview Practice</h1>
            <InterviewClient />
        </div>
    );
}
