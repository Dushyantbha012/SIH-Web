'use client';
import Form from "@/components/form/Form";
import { currentProfile } from "@/lib/profile/currentProfile";

export default function profile() {
  const userData = currentProfile();
  return (
    <div className="m-20">
      <div className="flex justify-center items-center ">
        
      </div>
    </div>
  );
}
