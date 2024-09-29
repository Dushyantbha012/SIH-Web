"use client";
import Form from "@/components/form/BasicForm";
import { Profile } from "@/components/profile-comp";
import useCreateJob from "@/hooks/useCreateJob";
import useEnterRole from "@/hooks/useEnterRole";
import useRecruiter from "@/hooks/useRecruiter";
import useResumeAnalyse from "@/hooks/useResumeAnalyse";
import useResumeBuild from "@/hooks/useResumeBuild";
export default function profile() {
  const enterRole = useEnterRole();
  const recruiter = useRecruiter();
  const addjob = useCreateJob();
  const resumeBuild = useResumeBuild();
  const resumeAnalyse = useResumeAnalyse();
  return (
    <div className="m-20">
      <div className="flex justify-center items-center mb-6">
        <Profile />
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={enterRole.onOpen}
          className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-2 px-6 rounded"
        >
          Profile Builder
        </button>

        {recruiter.isRecruiter && (
          <button
            onClick={addjob.onOpen}
            className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Add Job
          </button>
        )}

        {!recruiter.isRecruiter && (
          <>
            <button
              onClick={resumeBuild.onOpen}
              className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-2 px-6 rounded"
            >
              Resume Builder
            </button>

            <button
              onClick={resumeAnalyse.onOpen}
              className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-2 px-6 rounded"
            >
              Resume Analyzer
            </button>
          </>
        )}
      </div>
    </div>

  );
}
