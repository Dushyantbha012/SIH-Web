import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import {ClerkProvider} from '@clerk/nextjs'
import ClientOnly from "@/components/ClientOnly";
import ProfileModal from "@/components/modals/Profile/profileModal";
import ToasterProvider from "./providers/ToasterProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIH Hiring",
  description: "An AI Powered platform which revolutionizes hiring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

      <html lang="en">
        <body className={inter.className}>
          <ClientOnly>
          <ToasterProvider/>
          <ProfileModal/>
          <Header />
          <Footer />
          </ClientOnly>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
