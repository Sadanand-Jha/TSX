import User from '@/models/userModels'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import {dbConnnect} from '@/dbConfig/dbConfig'
import { error } from 'console'

dbConnnect();

export async function POST(request: NextRequest){
    try {
        const {username, password} = await request.json()

        const user = await User.findOne({username})
        
        const validPassword = await bcryptjs.compare(password,user.password);

        if(!validPassword){
            return NextResponse.json({
                error: "Incorrect Password"
            }, {
                status: 400
            })
        }
        if(!user.isVerified){
            return NextResponse.json({
                error: "Email not verified, check mail to verify your email"
            }, {status: 400})
        }

        const tokenData = {
            id: user._id,
            password: user.password,
            email: user.email
        }
        const token = jwt.sign(tokenData, process.env.JWT_STRING!, {expiresIn: '1d'});

        const response = NextResponse.json({
            message: "Login Successfully",
            success: true
        }, {status: 200})

        response.cookies.set('token', token, {httpOnly: true})
        console.log("Login works");
        return response;

    } catch (error: any) {
        // console.log("bekar error!");
        return NextResponse.json({error: "Something went wrong!"}, {status: 401});
    }
}