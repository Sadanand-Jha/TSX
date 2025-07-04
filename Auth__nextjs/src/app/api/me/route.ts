import { getDataFromToken } from "@/helpers/getDataFromToken";
import { dbConnnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";


dbConnnect();

export async function GET(request: NextRequest){
    try {
        const token_id = getDataFromToken(request)
        const user = await User.findOne({_id: token_id}).select('username email ');
        if(!user){
            return NextResponse.json({
                message: "user not found",
                success: false
            },{status: 400});
        }

        return NextResponse.json({user, success: true}, {status: 200});

    } catch (error: any) {
        return NextResponse.json(error.message);
    }
}