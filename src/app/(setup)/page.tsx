"use client";
import useCreateJob from "@/hooks/useCreateJob";
import useCreateProfile from "@/hooks/useCreateProfile";
import useEnterRole from "@/hooks/useEnterRole";
import { initialProfile } from "@/lib/profile/initialProfile";
import { redirect } from "next/navigation";

export default function Home() {
  const createProfile = useCreateProfile();
  const jobListing = useCreateJob();
  const enterRole = useEnterRole();
  return (
    <div>
      <button onClick={enterRole.onOpen}>
        click to open profile builder
      </button>
    </div>
  );
}
