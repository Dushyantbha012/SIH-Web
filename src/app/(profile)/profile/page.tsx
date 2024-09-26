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
      <div className="flex justify-center items-center ">
        <Profile />
      </div>
      <div>
        <button onClick={enterRole.onOpen}>
          click to open profile builder
        </button>
      </div>
      <div>
        {recruiter.isRecruiter && (
          <button onClick={addjob.onOpen}>click to add job</button>
        )}
      </div>
      <div>
        {!recruiter.isRecruiter && (
          <button onClick={resumeBuild.onOpen}>click to build resume</button>
        )}
      </div>
      <div>
        {!recruiter.isRecruiter && (
          <button onClick={resumeAnalyse.onOpen}>click to analyse resume</button>
        )}
      </div>
    </div>
  );
}
