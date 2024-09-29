"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import React, { useState, useMemo } from "react";

import Modal from "../modal";
import useResumeAnalyse from "@/hooks/useResumeAnalyse";
import Heading from "../ModalInputs/Heading";
import Button from "../ModalInputs/Button";

interface FormData {
 resume : File | null;
}
const resumeAnalysis = {
  "overallRating": 85,
  "sections": [
    {
      "title": "Skills Match",
      "score": "18 out of 20 points",
      "feedback": "The job seeker has strong skills in Python programming, Deep Learning, and Neural Networks, which align with the job requirements. They also have experience in SQL, MongoDB, and machine learning algorithms, which is a bonus. The only shortcoming is that they don't mention proficiency in Excel, PowerPoint, and Tableau, which are required skills for this job."
    },
    {
      "title": "Experience",
      "score": "14 out of 20 points",
      "feedback": "The job seeker has around 3-4 years of experience in data science, which is somewhat relevant to the job description. However, their experience is mostly in developing internal tools and chatbots, whereas the job description requires them to collaborate with product design and engineering teams, develop innovative statistical models, and communicate findings to stakeholders. The job seeker's experience in the industry is also not specified."
    },
    {
      "title": "Education",
      "score": "7 out of 10 points",
      "feedback": "The job seeker has completed their computer science engineering degree with a specialization in data science from Punjab Engineering College, Chandigarh. They also have certifications in Deep Learning by Deeplearning.Ai and IBM Data Science Specialization. These certifications are relevant to the job description. However, the job seeker's educational background does not explicitly mention statistics or applied mathematics, which is a requirement for this job."
    },
    {
      "title": "Accomplishments",
      "score": "8 out of 10 points",
      "feedback": "The job seeker has significant achievements in their projects, including increasing typing efficiency and user experience, achieving precise text analysis metrics, and improving user engagement and satisfaction metrics. These achievements demonstrate their proficiency in data analysis and machine learning."
    },
    {
      "title": "Cultural Fit",
      "score": "8 out of 10 points",
      "feedback": "The job seeker's values and adaptability align somewhat with the company's culture and work environment. They mention having expertise in UI design and AI-driven applications, which could be beneficial in this role. However, the job description does not explicitly specify the company culture."
    },
    {
      "title": "Geographical Fit",
      "score": "5 out of 5 points",
      "feedback": "The job seeker's location is Gurugram, which matches the job location."
    },
    {
      "title": "Career Progression",
      "score": "7 out of 10 points",
      "feedback": "The job seeker has a relatively steady career growth trajectory, moving from an undergraduate degree to becoming a proficient data scientist. However, they lack explicit mentions of taking on increasing responsibilities or managing projects, which is a requirement for this job."
    },
    {
      "title": "Availability",
      "score": "5 out of 5 points",
      "feedback": "The job seeker is available to start work."
    },
    {
      "title": "Industry Knowledge",
      "score": "4 out of 5 points",
      "feedback": "The job seeker's understanding of industry trends and market conditions is limited. However, they demonstrate expertise in AI-driven applications, which could be valuable for this role."
    },
    {
      "title": "Recommendations/References",
      "score": "Not Provided",
      "feedback": "No recommendations or references were provided."
    }
  ],
  "strengths": [
    "Strong skills in Python programming, Deep Learning, and Neural Networks",
    "Significant achievements in data analysis and machine learning projects",
    "Expertise in UI design and AI-driven applications"
  ],
  "weaknesses": [
    "Limited experience in developing statistical models and collaborating with product design and engineering teams",
    "Lacking explicit mentions of taking on increasing responsibilities or managing projects",
    "Limited industry knowledge and certifications in statistics or applied mathematics"
  ],
  "overallAssessment": "ARYAN KAUL has a strong profile with significant achievements in data analysis and machine learning projects. However, he lacks experience in developing statistical models, collaborating with product design and engineering teams, and managing projects. His educational background and industry knowledge are somewhat limited. Nevertheless, his strong skills and achievements make him a competitive candidate for the role."
};

const ResumeAnalyse = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
        resume: null,
    },
  });

  const resumeAnalyse = useResumeAnalyse();
  const [isLoading, setIsLoading] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [step, setStep] = useState(1);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    

    setStep(2);
   
    const profileData = {
      resume: resume,
    };
    console.log(profileData);
    
  };

  const actionLabel = useMemo(() => {
    if(step === 1) return "Analyse";
    else return null;
  }, [step]);

  
  let bodyContent = (
    <div className="file_upload p-5 border-4 border-dotted border-gray-300 rounded-lg">
      <svg
        className="text-indigo-500 w-16 h-16 mx-auto mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <div className="input_field flex flex-col items-center">
        <label>
          <input
            className="text-sm cursor-pointer w-36 hidden"
            type="file"
            onChange={(e) =>
              setResume(e.target.files ? e.target.files[0] : null)
            }
          />
          {!resume ? (<div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-2 px-4 hover:bg-indigo-500">
            Select File
          </div>):(
            <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-2 px-4 hover:bg-indigo-500">
            Selected File : <span className="text-white">{resume.name}</span>
          </div>
          )}
          
        </label>
      </div>
    </div>
  );
  if (step === 2) {
    bodyContent = (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 overflow-y-auto max-h-[90vh]">
          <h2 className="text-lg font-bold mb-4">
            Resume Analysis: {resumeAnalysis.overallRating}
          </h2>
          <div className="flex flex-col space-y-6">
            {resumeAnalysis.sections.map((section, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <Heading title={section.title} />
                <p className="text-sm text-gray-600">{section.score}</p>
                <p className="text-sm">{section.feedback}</p>
              </div>
            ))}
          </div>
  
          <div className="mt-6">
            <Heading title="Strengths" />
            <ul className="list-disc list-inside pl-4">
              {resumeAnalysis.strengths.map((strength, index) => (
                <li key={index} className="text-sm">{strength}</li>
              ))}
            </ul>
          </div>
  
          <div className="mt-6">
            <Heading title="Weaknesses" />
            <ul className="list-disc list-inside pl-4">
              {resumeAnalysis.weaknesses.map((weakness, index) => (
                <li key={index} className="text-sm">{weakness}</li>
              ))}
            </ul>
          </div>
  
          <div className="mt-6 pb-8">
            <Heading title="Overall Assessment" />
            <p className="text-sm">{resumeAnalysis.overallAssessment}</p>
          </div>
        <Button label="Close" onClick={resumeAnalyse.onClose} />
        </div>
      </div>
    );
  }
  
  

  return (
    <Modal
      isOpen={resumeAnalyse.isOpen}
      onClose={resumeAnalyse.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      title="Welcome! Analyse your resume"
      body={bodyContent}
    />
  );
};

export default ResumeAnalyse;
