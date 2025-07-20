import connectDB from "@/app/dbConnect"
import { NextRequest, NextResponse } from "next/server"


connectDB()

export async function GET(request: NextRequest){
    console.log("this reached!")
    return NextResponse.json({message: "everything went well", status: 200})
}