import mongoose from "mongoose";

export default async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_DB!);
        console.log(process.env.MONGO_DB)
        console.log("Mongodb Connected!")
    } catch (error) {
        console.log("Meow Mongo Error!")
        console.log(error)
        process.exit(1);
    }
}