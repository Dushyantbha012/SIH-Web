"use client";
import Form from "@/components/form/BasicForm";
import { Profile } from "@/components/profile-comp";
import useCreateJob from "@/hooks/useCreateJob";
import useEnterRole from "@/hooks/useEnterRole";
import useJobSeeker from "@/hooks/useJobSeeker";
import useMentor from "@/hooks/useMentor";
import useRecruiter from "@/hooks/useRecruiter";
import useResumeAnalyse from "@/hooks/useResumeAnalyse";
import useResumeBuild from "@/hooks/useResumeBuild";
import { useRouter } from "next/navigation";
export default function profile() {
  const enterRole = useEnterRole();
  const recruiter = useRecruiter();
  const addjob = useCreateJob();
  const resumeBuild = useResumeBuild();
  const resumeAnalyse = useResumeAnalyse();
  const mentor = useMentor();
  const jobSeeker = useJobSeeker();
  const router = useRouter();
  return (
    <div className="m-20">
      <div className="flex justify-center items-center mb-6">
        <Profile />
      </div>
      {mentor.isMentor && (
        <p>
          Logged in as mentor
        </p>
      )}
      {jobSeeker.isJobSeeker && (
        <p>
          Logged in as job seeker
        </p>
      )}
      {recruiter.isRecruiter && (
        <p>
          Logged in as recruiter
        </p>
      )}
      <div className="flex justify-between items-center">
        <button
          onClick={enterRole.onOpen}
          className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-2 px-6 rounded"
        >
          Profile Builder
        </button>

        {(recruiter.isRecruiter && !mentor.isMentor && !jobSeeker.isJobSeeker ) && (
          <div>

          <button
            onClick={addjob.onOpen}
            className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Add Job
          </button>
          <button
            onClick={()=>{router.push('/recruiter')}}
            className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            View Applicants
          </button>
          </div>
        )}
        {(!recruiter.isRecruiter && mentor.isMentor && !jobSeeker.isJobSeeker) && (
          <button
            onClick={()=>{router.push('/mentor/dashboard')}}
            className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            View Meetings
          </button>
        )}
        {(!recruiter.isRecruiter && !mentor.isMentor && jobSeeker.isJobSeeker) && (
          <>
            <button
              onClick={resumeBuild.onOpen}
              className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-2 px-6 rounded"
            >
              Resume Builder
            </button>
            <button
              onClick={()=>{router.push('/user/dashboard')}}
              className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-2 px-6 rounded"
            >
              View Your Applications
            </button>
          </>
        )}
      </div>
    </div>

  );
}
