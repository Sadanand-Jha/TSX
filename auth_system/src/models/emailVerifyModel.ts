import mongoose, { Schema } from "mongoose";

const emailVerifyModel = new Schema({
    email: {
        type: String,
        required: [true, "Please provide the email"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300
    },
    token: {
      type: String,
      default: undefined
    }
})

emailVerifyModel.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 300,
    partialFilterExpression: { isVerified: false }
  }
);

export const EmailVerify = mongoose.models.verifyEmail || mongoose.model("verifyEmail",emailVerifyModel)
