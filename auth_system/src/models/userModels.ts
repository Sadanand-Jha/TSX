import mongoose from "mongoose";
import { Schema } from "mongoose";

const user = new Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"]
    },
    token: {
        type: String,
        default: undefined
    },
    password: {
        type: String, 
        required: [true, "Please set a Password for this username"]
    },
    username: {
        type: String,
        required: [true, "Please provide the username"],
        unique: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

const User = mongoose.models.user || mongoose.model('user', user)

export default User