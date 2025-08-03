import connectDB from "@/app/dbConnect";
import sendEmail from "@/helpers/nodemailer";
import { EmailVerify } from "@/models/emailVerifyModel";
import { NextRequest, NextResponse } from "next/server";


connectDB()

export async function POST(request: NextRequest){
    const req = await request.json()

    const {emailId} = req;
    console.log(emailId);
    try {
        console.log("the request is ", req);
        sendEmail(emailId)
        const verifyEmail = new EmailVerify({email: emailId})
        await verifyEmail.save()
        return NextResponse.json({message: "Email sent!"},{status: 200})
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 400})
    }
}