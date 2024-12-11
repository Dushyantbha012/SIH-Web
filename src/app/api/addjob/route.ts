import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { initialProfileRecruiter } from "@/lib/profile/initialProfileRecruiter";
import { currentUser } from "@clerk/nextjs/server";

interface CreateJobRequest  {
  title: string; // Add this line
  description: string;
  responsibilities: string;
  requirements: string;
  experience: string;
  location: string;
  jobType: string;
  mode: string;
  jobPath: string; // Include jobPath
  salary: string;
}

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const recruiterId = user?.id;

    if (!recruiterId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body: CreateJobRequest = await req.json();
    const {
      title, // Extract the title
      description,
      responsibilities,
      requirements,
      experience,
      location,
      jobType,
      mode,
      jobPath,
      salary,
    } = body;

    // Create the job listing in the database
    const jobListing = await db.joblisting.create({
      data: {
        recruiterId: recruiterId,
        title, // Include the title
        description,
        responsibilities,
        requirements,
        experience,
        location,
        jobType,
        mode,
        jobPath,
        organization: "Default Organization", // Adjust as needed
        salary,
      },
    });

    // Return the created job listing
    return NextResponse.json(jobListing, { status: 201 });
  } catch (error: any) {
    console.error("Error creating job listing:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
