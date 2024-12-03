import { GET_INTERVIEW_ANALYSIS,GET_QUESTIONS,GET_RECOMMENDATION,GET_RESUME_BUILD,GET_SIMILARITY_SCORE, Question_Transcript } from ".";

export type MessagesToAI = {
    type : typeof GET_RECOMMENDATION,
    data:{
        job_description:string, 
        resume:string
    }
}|{
    type : typeof GET_RESUME_BUILD,
    data:{
        job_description:string, 
        resume:string
    }
}|{
    type : typeof GET_SIMILARITY_SCORE,
    data:{
        job_description:string, 
        resume:string
    }
}|{
    type : typeof GET_INTERVIEW_ANALYSIS,
    data:{
        question_responses:Question_Transcript[]
    }
}|{
    type : typeof GET_QUESTIONS,
    data:{
        resume:string
    }
}