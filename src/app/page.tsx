'use client';
import Form from "@/components/form/Form";
import useCreateProfile from "@/hooks/useCreateProfile";

export default function Home() {
  const createProfile = useCreateProfile();
  return (
    <div>
      <button onClick={createProfile.onOpen}>click to open profile builder</button>
    </div>
  );
}
