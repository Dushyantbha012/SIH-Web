import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { currentUserData } from "@/lib/profile/currentUserData";

interface JobListing {
  id: string;
  title: string;
  // Add other job listing properties as needed
}

interface UserData {
  id: string;
  userId: string;
  jobListings: JobListing[];
  // Add other user data properties as needed
}

export async function GET(req: Request) {
  const userData = await currentUserData() as UserData[] | null;
  
  return NextResponse.json({ 
    listings: userData?.[0]?.jobListings ?? [] 
  });
}