"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import React, { useState, useMemo } from "react";

import Modal from "../modal";
import useResumeAnalyse from "@/hooks/useResumeAnalyse";

interface FormData {
 resume : File | null;
}
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    

    setIsLoading(true);
    const profileData = {
      resume: resume,
    };
    console.log(profileData);
    
  };

  const actionLabel = useMemo(() => {
    return "Analyse";
  }, []);

  const secondaryActionLabel = useMemo(() => {
    return "Back";
  }, []);

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
 
  return (
    <Modal
      isOpen={resumeAnalyse.isOpen}
      onClose={resumeAnalyse.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      title="Welcome! Analyse your resume"
      body={bodyContent}
    />
  );
};

export default ResumeAnalyse;
