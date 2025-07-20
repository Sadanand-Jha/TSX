import nodemailer from 'nodemailer';

const sendEmail = async (email: string) => {
  try {
    let token = "";
    const letters = "qwertyuiopasdfghjklzxcvbnm1234567890";

    for(let i = 0; i < 12; i++){
      token += letters[Math.floor(Math.random() * (letters.length - 1))];
    }
    console.log(token);

    const transporter = nodemailer.createTransport({

      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_ID,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    console.log("this reached!");

    console.log(process.env.NODEMAILER_ID);
    console.log("I reached here!");

    console.log("recepient is ", email);

    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_ID,
      to: email,
      subject: "Verify Your Email to get started!",
      text: "Camvo",
      html: `<p>Hello there 👋,</p><p>We're excited to have you join us at <strong>Camvo</strong>! To get started, please verify your email address by clicking the link below:</p><div><a href="http://localhost:3000/verification" style="display: inline-block; background-color: #4F6EE5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Verify My Email</a></div><p>If you didn't sign up for Camvo or believe this was a mistake, you can safely ignore this email — no action is needed.</p><p>Thanks for choosing us!</p><b>— The Camvo Team</b>`
    });

    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending mail:", err);
  }
};

export default sendEmail
