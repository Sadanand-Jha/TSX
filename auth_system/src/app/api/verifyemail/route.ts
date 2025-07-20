import sendEmail from "@/helpers/nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const req = await request.json()

    const {emailId} = req;
    console.log(emailId);
    try {
        console.log("the request is ", req);
        sendEmail(emailId)
        return NextResponse.json({message: "Email sent!"},{status: 200})
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 400})
    }
}