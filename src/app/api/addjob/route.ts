import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { initialProfileRecruiter } from "@/lib/profile/initialProfileRecruiter";
import { currentUser } from "@clerk/nextjs/server";
import {sendMail} from "@/lib/mailer/mailer"
interface CreateJobRequest {
  description: string;
  responsibilities: string;
  requirements: string;
  experience: string;
  location: string;
  jobType: string;
  mode: string;
  jobPath:string
}

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const recruiterId = user?.id;

    if (!recruiterId) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const profile = await initialProfileRecruiter();
    if (!profile) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    
    const reqData: CreateJobRequest = await req.json();

    const {
      description,
      responsibilities,
      requirements,
      experience,
      location,
      jobType,
      mode,jobPath
    } = reqData;

    if (!description || !responsibilities || !requirements || !experience || !location || !jobType || !mode) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const organization = profile.organization;
    const jobListing = await db.joblisting.create({
      data: {
        recruiterId,
        description,
        responsibilities,
        requirements,
        experience,
        location,
        jobType,
        mode,
        organization,
        jobPath,
        title: "Default Title", // Add appropriate title
        salary: "Default Salary" // Add appropriate salary
      },
    });
    await db.recruiter.update({
      where: {
        id: profile.id,
      },
      data: {
        jobListings: {
          connect: { id: jobListing.id },
        },
      },
    });
    const usersData = await db.userData.findMany({where:{
      role:jobPath
    }})
    const message = "There is a new job posting for the role of "+jobPath;
    const htmlContent = "";
    for (const user of usersData) {
      sendMail(user.email,"New Job Posting Update",message,htmlContent)
    }
    return NextResponse.json({
      message: 'Job listing created successfully',
      jobListing,
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating job listing: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
