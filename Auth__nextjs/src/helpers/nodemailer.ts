import User from "@/models/userModels";
import bcryptjs from "bcryptjs";

// import { Console } from "console";
import nodemailer from 'nodemailer'

export const sendEmail = async({email, emailType, userId} : any) => {
    try {
        //create a hashedtoken
        const user = await User.findOne({email});
        if(!user){
            console.log("user not found in nodemailer")
            return "user not found!";
        }

        let xyz = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfhjklzxcvbnm";

        let hashedToken = user.username;
        for(let i = 0; i < 30; i++){
            hashedToken += xyz[Math.floor(Math.random() * (xyz.length))];
        }
        console.log(hashedToken);
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {
                    
                    verifyToken: hashedToken, 
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )
            console.log('this is the user',user)
        }
        await user.save()
        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.NodeMailerUserId,
                pass: process.env.NodeMailerPassword,
            },
        });
        const mailOptions = {
            from: process.env.NodeMailerUserId,
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email":"Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === 'VERIFY' ? 'verifyemail': 'changepassword'}?token=${hashedToken}"> here </a> to ${emailType === "VERIFY" ? "verify your email": "reset your password"}</p> `
        }

        // console.log("email is ", email);
        
        const mailResponse = await transporter.sendMail(mailOptions);
        // console.log(mailResponse);
        // console.log("Message sent:", mailResponse.messageId);

        return mailResponse;

    } catch (error: any) {
        console.log("error occured in nodemailer")
        // console.log("meow", error.message);
        throw new Error(error.message);
    }
}