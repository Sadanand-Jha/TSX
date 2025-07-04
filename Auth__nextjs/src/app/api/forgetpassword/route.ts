import { dbConnnect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/nodemailer";
import User from "@/models/userModels";
// import axios from "axios";
// import { NextApiRequestQuery } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

dbConnnect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username} = reqBody

        const user = await User.findOne({username});
        if(!user){
            return NextResponse.json({
                error: "User not found",
                success: false 
            },{
                status: 400
            })
        }
        console.log("meow");
        await sendEmail({email: user.email, emailType: "RESET", userId: user._id});
        return NextResponse.json({
            message: "everything went well!"
        },
        {status: 200})
    
    } catch (error: any) {
        console.log("error in forgetpassword")
        return NextResponse.json({
            error: "Something went wrong!"
        }, {
            status: 400
        })
    }


}