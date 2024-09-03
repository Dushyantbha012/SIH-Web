import { initialProfile } from "@/lib/profile/initialProfile";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await initialProfile();

  const user = await currentUser();
  //console.log("Profile is ", profile, " \n user is ", user);
  console.log("is complete: ", profile?.complete);
  if (!profile?.complete) {
    console.log(
      "\n\n ----------------------------------------------------------------------------------------------\n\n To be Redirected \n\n --------------------------------------------------------------------------------------------------------"
    );
    redirect("/profile");
  }
  return <div>{children}</div>;
}
