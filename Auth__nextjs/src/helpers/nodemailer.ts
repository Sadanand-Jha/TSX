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
        const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD
        }

        });
    
        const mailOptions = {
            from: "sadanand@gmail.com",
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email":"Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === 'VERIFY' ? 'verifyemail': 'changepassword'}?token=${hashedToken}"> here </a> to ${emailType === "VERIFY" ? "verify your email": "reset your password"}</p> `
        }

        console.log("email is ", email);

        // console.log("mail sent successfully!")
        // console.log(process.env.NODEMAILER_USER);
        // console.log(process.env.NODEMAILER_PASSWORD);
        
        const mailResponse = await transport.sendMail(mailOptions);
        console.log(mailResponse);
        // console.log("Message sent:", mailResponse.messageId);

        return mailResponse;

    } catch (error: any) {
        console.log("error occured in nodemailer")
        console.log("meow", error.message);
        throw new Error(error.message);
    }
}