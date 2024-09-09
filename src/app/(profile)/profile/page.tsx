"use client";
import Form from "@/components/form/BasicForm";
import useCreateJob from "@/hooks/useCreateJob";
import useEnterRole from "@/hooks/useEnterRole";
import useRecruiter from "@/hooks/useRecruiter";
export default function profile() {
  const enterRole = useEnterRole();
  const recruiter = useRecruiter();
  const addjob = useCreateJob();
  return (
    <div className="m-20">
      <div className="flex justify-center items-center ">Profile Page</div>
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
    </div>
  );
}
