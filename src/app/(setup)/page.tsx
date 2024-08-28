import { initialProfile } from "@/lib/profile/initialProfile";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function SetupPage() {
  const profile = await initialProfile();
  const user = await currentUser();

  if (
    profile?.name === "null null" ||
    (user?.firstName === null && user?.lastName === null) ||
    profile?.complete === false
  ) {
    return redirect(`/user`);
  }
}

export default SetupPage;
