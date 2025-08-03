import connectDB from "@/app/dbConnect";
import { useEmailStore } from "@/store/email_verification";
import User from "@/models/userModels";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

connectDB()
export async function POST(request :NextRequest){
    try {

        const email = useEmailStore((state) => state.email)
        const reqBody = await request.json()
        const {username, password} = reqBody

        const salt = await bcryptjs.genSalt(10)
        const hashedpassword1 = await bcryptjs.hash(password, salt);

        console.log("I am here from the craete_user api")

        const create_user = new User({
            email,
            username, 
            password: hashedpassword1
        })

        await create_user.save()

        return NextResponse.json({
            message:"User created successfully!"
        },
        {
            status: 200
        })

    } catch (error) {
        return NextResponse.json({
            message: "Error in creating the user",
            error
        },
    {
        status: 400
    })
    }
}