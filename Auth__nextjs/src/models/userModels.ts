import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"]
    },
    password:{
        type:String,
        required:[true, "Please provide a password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean, 
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date

})

const User = mongoose.models.person || mongoose.model("person", userSchema)

export default User;