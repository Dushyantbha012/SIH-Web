import { NextResponse } from "next/server";
import { RedisManager } from "@/lib/redis/RedisManager";
import { GET_RECOMMENDATION } from "@/lib/redis/types";
import axios from "axios";

export async function POST(request: Request) {
  const { job_description, resume } = await request.json();

  if (!job_description) {
    return NextResponse.json(
      { error: "Job description is required" },
      { status: 400 }
    );
  }

  try {
    const res = await RedisManager.getInstance().sendAndAwait({
      type: GET_RECOMMENDATION,
      data: { job_description, resume },
    })
    return NextResponse.json(res.payload);
    // const userData = await currentUserData();
    // if (userData && userData[0] && userData[0].resume) {
    //   const res = await axios.post("http://127.0.0.1:5000/recommendation", {
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
