import User from "@/models/userModels";
import { dbConnnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/nodemailer";

dbConnnect();

export async function POST(request: NextRequest){
    const reqBody = await request.json()
    const {token} = reqBody;
    try {
        
        console.log(token);

        // console.log("verifyEmail reached");

        const user = await User.findOne({verifyToken : token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json({error: "user not found!"}, 
                {status: 500}
            )
        }
        console.log(user);

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({
            message: "Email verified Successfully!",
            success: true
        }, {
            status: 200
        })


    } catch (error: any) {
        console.log('route reached!')
        return NextResponse.json(error.message)
    }

}