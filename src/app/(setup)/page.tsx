"use client";
import useCreateProfile from "@/hooks/useCreateProfile";
import { initialProfile } from "@/lib/profile/initialProfile";
import { redirect } from "next/navigation";

export default async function Home() {
  const createProfile = useCreateProfile();

  return (
    <div>
      <button onClick={createProfile.onOpen}>
        click to open profile builder
      </button>
    </div>
  );
}
