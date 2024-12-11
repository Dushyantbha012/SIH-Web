// Import necessary modules
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req:Request) {
    const {jobId} = await req.json();
    const users = await db.userApplications.findMany({
        where: {
          joblistingId: jobId,
        },
        include: {
          userData: true,
        },
      });

      return NextResponse.json({users})
}