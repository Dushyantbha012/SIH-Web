import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import ProfileModal from "@/components/modals/Profile/User/studentProfileModal";
import ListJobModal from "@/components/modals/JobListing/listjobModal";
import EnterRole from "@/components/modals/EnterRole/enterRole";
import RecruiterProfileModal from "@/components/modals/Profile/Recruiter/recruiterProfileModal";
import ResumeBuildModal from "@/components/modals/ResumeBuild/resumeBuild";
import ResumeAnalyse from "@/components/modals/ResumeAnalyse/resumeAnalyse";
export const metadata: Metadata = {
  title: "SIH Hiring",
  description: "An AI Powered platform which revolutionizes hiring",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-sans">
          <Header />
          <ProfileModal />
          <ListJobModal />
          <EnterRole />
          <RecruiterProfileModal />
          <ResumeBuildModal />
          <ResumeAnalyse />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
