import connectDB from '@/app/dbConnect';
import { EmailVerify } from '@/models/emailVerifyModel';
import { NextRequest, NextResponse } from 'next/server';

connectDB();
export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const { emailId } = reqBody

        console.log("the email in verifymeail model is ", emailId);
        const email_verify = new EmailVerify({
            email: emailId
        })

        console.log("creating new email");

        await email_verify.save()
        return NextResponse.json({message: "added to database"}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({error}, {status: 400});
    }
}