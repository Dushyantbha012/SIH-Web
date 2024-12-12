import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req: Request, res: NextResponse) {
    try {
        
        const {mentorId} = await req.json();      
        const mentor = await db.mentor.findUnique({
            where: { id: mentorId },
            include: {
              schedule: true,
            },
          });
      
          if (!mentor) {
            return new NextResponse("Mentor not found", { status: 404 });
          }
      
          return NextResponse.json(mentor);
       
    } catch (error) {
        console.log("FETCH_MENTOR \n", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}