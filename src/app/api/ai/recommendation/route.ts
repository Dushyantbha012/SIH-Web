import { NextResponse } from "next/server";
import { RedisManager } from "@/lib/redis/RedisManager";
import { GET_RECOMMENDATION } from "@/lib/redis/types";
import axios from "axios";
import { currentUserData } from "@/lib/profile/currentUserData";

export async function POST(request: Request) {
  const { job_description } = await request.json();

  if (!job_description) {
    return NextResponse.json(
      { error: "Job description is required" },
      { status: 400 }
    );
  }

  try {
   
    const userData = await currentUserData();
    if (userData && userData[0] && userData[0].resume) {
      const res = await RedisManager.getInstance().sendAndAwait({
        type: GET_RECOMMENDATION,
        data: { job_description, resume:userData[0].resume },
      })
      console.log("Ai/recommendation \n",res.payload);
      return NextResponse.json(res.payload);
    } else {
      return NextResponse.json(
        { error: "Error Verifying You" },
        { status: 420 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
