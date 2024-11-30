import { NextResponse } from "next/server";

import { currentUserData } from "@/lib/profile/currentUserData";
import axios from "axios";
import { RedisManager } from "@/lib/redis/RedisManager";
import { GET_SIMILARITY_SCORE } from "@/lib/redis/types";

export async function POST(request: Request) {
  
  const { job_description } = await request.json();

  if (!job_description) {
    return NextResponse.json(
      { error: "Job description is required" },
      { status: 400 }
    );
  }

  try {
    const pdf_url="https://utfs.io/f/CFVcZg4zyWN2kiCsD6eSI8VdU0zXEDFW741Zmt5HCbjinxGu";
    const res = await RedisManager.getInstance().sendAndAwait({
      type: GET_SIMILARITY_SCORE,
      data: {
        job_description: job_description,
        resume: pdf_url,
      },
    })
    return NextResponse.json(res.payload);
    // const userData = await currentUserData();
    // if (userData && userData[0] && userData[0].resume) {
    //   const res = await axios.post("http://127.0.0.1:5000/similarity-score", {
    //     job_description: job_description,
    //     pdf_url: userData[0].resume,
    //   });
    //   return NextResponse.json(res.data);
    // } else {
    //   return NextResponse.json(
    //     { error: "Error Verifying You" },
    //     { status: 420 }
    //   );
    // }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
