import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { dbConnnect } from "@/dbConfig/dbConfig";

dbConnnect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, password1} = reqBody;
    
        const user = await User.findOne({username});
        
        if(!user){
            return NextResponse.json({
                error: "user not found!"
            }, {status: 400});
        }

        console.log('save password1 reached!')
        console.log('new password1 is ', password1)

        const salt = await bcryptjs.genSalt(10)
        const hashedpassword1 = await bcryptjs.hash(password1, salt);

        user.password = hashedpassword1;
        
        await user.save()
        return NextResponse.json({
            message: "Success!",
            success: true
        }, {
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json({
            error: "Failed in updating the password1"
        }, {
            status: 400
        })

    }
}