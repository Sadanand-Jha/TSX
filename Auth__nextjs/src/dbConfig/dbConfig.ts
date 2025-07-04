import mongoose from "mongoose";
// import { NextResponse } from "next/server";

export async function dbConnnect(){
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        console.log("MONGODB CONNECTED!");
        
    } catch (error) {
        console.log("Meow Mango error");
        console.log(error);
        process.exit(1)
    }
}