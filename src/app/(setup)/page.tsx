"use client";
import useCreateJob from "@/hooks/useCreateJob";
import useCreateProfile from "@/hooks/useCreateProfile";
import useEnterRole from "@/hooks/useEnterRole";
import useRecruiter from "@/hooks/useRecruiter";
import { initialProfile } from "@/lib/profile/initialProfile";
import { redirect } from "next/navigation";

export default function Home() {
  const enterRole = useEnterRole();
  const recruiter = useRecruiter();
  const addjob = useCreateJob();
  return (
    <>
    <div>
      <button onClick={enterRole.onOpen}>
        click to open profile builder
      </button>
      </div><div>
      {recruiter.isRecruiter && (
        <button onClick={addjob.onOpen}>
        click to add job
      </button>
      )}
      
    </div>
    </>
  );
}
