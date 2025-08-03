import { EmailVerify } from "@/models/emailVerifyModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, token} = reqBody;

        console.log("the verifyToken email is ", email);
        

        const email_verification = await EmailVerify.findOne({email})
        console.log(email_verification.email);
        
        console.log("here i am")
        
        if(email_verification?.token === token){
            email_verification.token = undefined
            email_verification.isVerified = true;
            await email_verification.save()
            return NextResponse.json({
                message: "The token matches!"
            },{
                status: 200
            })
        }
        else{
            return NextResponse.json({
                message: "The token didnt matches!"
            }, {
                status: 400
            })
        }
    } catch (error) {
        return NextResponse.json({
            error,
            message: "there is a problem in verificaiton of token in the api"
        }, {
            status: 400
        })
    }
} 