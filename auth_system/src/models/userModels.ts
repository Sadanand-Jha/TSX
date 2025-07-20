import mongoose from "mongoose";
import { Schema } from "mongoose";

const emailVerification = new Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"]
    },
    token: {
        type: String,
        default: undefined
    },

    username: {
        type: String,
        required: [true, "Please provide the username"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    createdAt: {type: Date, default: Date.now, expire: 300},
});

const Verification = mongoose.models.verify || mongoose.model('verify', emailVerification)

export default Verification