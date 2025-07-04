import { dbConnnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

dbConnnect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody;

        console.log('change password reached!')

        const user = await User.findOne({forgotPasswordToken: token})
        // , forgotPasswordTokenExpiry: {$gt: Date.now()}
        console.log('here is your token',token);
        console.log('changepassword route is reached!')
        if(!user){
            return NextResponse.json({
                error: "User not found!"
            }, {
                status: 400
            })
        }

        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined

        await user.save()

        return NextResponse.json({
            message: "User found!",
            username: user.username
        }, {
            status: 200
        })
        
    } catch (error: any) {
        return NextResponse.json({
            error: "Something went wrong!"
        }, {status: 400})
    }
}