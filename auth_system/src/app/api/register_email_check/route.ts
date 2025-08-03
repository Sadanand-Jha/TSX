import connectDB from "@/app/dbConnect";
import { EmailVerify } from "@/models/emailVerifyModel";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

connectDB()
export async function GET(request: NextRequest){
    try {
        const {searchParams} = new URL(request.url);
        const emailId = searchParams.get("email")

        console.log("The email received is ", emailId);

        const email = await EmailVerify.findOne({email : emailId});
        if(email){
            return NextResponse.json({message: "FOUND"},{status: 200})
        }
        return NextResponse.json({message: "NOTFound"}, {status: 200})
        
    } catch (error: any) {
        return NextResponse.json({error}, {status: 400});
    }
}