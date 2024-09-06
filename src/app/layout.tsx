import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import ProfileModal from "@/components/modals/Profile/profileModal";
import ListJobModal from "@/components/modals/JobListing/listjobModal";
import EnterRole from "@/components/modals/EnterRole/enterRole";
const inter = Inter({ subsets: ["latin"] });
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
        <body className={inter.className}>
          <Header />
          <ProfileModal/>
          <ListJobModal/>
          <EnterRole/>
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
