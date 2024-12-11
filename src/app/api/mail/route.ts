import { NextResponse } from "next/server";
import {sendMail} from "@/lib/mailer/mailer"

export async function GET(req: Request){
    await sendMail("dushyantbha012@gmail.com","Hello","Text from  the njdfneirbn","");
    return NextResponse.json({"Response: ":"Mail sent"})
}