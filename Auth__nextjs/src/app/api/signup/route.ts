import { dbConnnect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/nodemailer";
import User from "@/models/userModels";
import bcryptjs, { getSalt } from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import toast from "react-hot-toast";


dbConnnect()


export async function POST(request: NextRequest){
    try {
        const {email, password, username} = await request.json()

        const username_check = await User.findOne({username})
        const email_check = await User.findOne({email});
        if(username_check || email_check){
            console.log("username found");
            return NextResponse.json({error: "username/email already exists!"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
    
        const user = new User({
            email,
            password: hashedPassword,
            username
        })

        await user.save()

        await sendEmail({email, emailType: "VERIFY", userId : user._id})
        
        return NextResponse.json({email, password, username}, {status: 201});

    } catch (error) {
        return NextResponse.json({error}, {status: 201});
    }
}