// Import necessary modules
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Define TypeScript interfaces for the request body and response
interface UpdateJobApplicationRequest {
  id: string;
  experience: string;
  resume: string;
  location: string;
  apply: boolean;
}

interface JobApplication {
  id: string;
  experience: string;
  resume: string;
  location: string;
  apply: boolean;
  // Add other fields that your job application object might have
}

// PUT request handler
export async function PUT(request: Request) {
  try {
    // Parse the request body and validate the data
    const body: UpdateJobApplicationRequest = await request.json();
    const { id, experience, resume, location, apply } = body;

    // Validate required fields
    if (
      !id ||
      !experience ||
      !resume ||
      !location ||
      typeof apply !== "boolean"
    ) {
      return NextResponse.json(
        {
          error:
            "All fields (id, experience, resume, location, apply) are required.",
        },
        { status: 400 }
      );
    }

    //
    //
    // create a jobapplication schema
    //
    //

    // const updatedJobApplication: JobApplication =
    //   await db.jobApplication.update({
    //     where: { id },
    //     data: {
    //       experience,
    //       resume,
    //       location,
    //       apply,
    //     },
    //   });

    // return NextResponse.json(updatedJobApplication, { status: 200 });
  } catch (error) {
    // Log the error and return a 500 status with an error message
    console.error("Error updating job application:", error);
    return NextResponse.json(
      { error: "Failed to update job application. Please try again later." },
      { status: 500 }
    );
  }
}
