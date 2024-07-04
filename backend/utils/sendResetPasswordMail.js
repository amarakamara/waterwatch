import dotenv from "dotenv";
dotenv.config();
import sendEmail from "./sendMail.js";

const devOrigin = "http://localhost:3001";
const prodOrigin = "https://waterwatch-seven.vercel.app";

const origin = process.env.NODE_ENV === "development" ? devOrigin : prodOrigin;

export default async function sendResetPasswordMail(email, token) {
  const mailOptions = {
    user: process.env.MY_EMAIL,
    password: process.env.MY_PASSWORD,
    from: process.env.MY_EMAIL,
    to: email,
    subject: "Please verify your WaterWatch account.",
    text: `Hey there,

    Someone requested a new password for your [customer portal] account.
    
    Click this link to reset your password: ${origin}/newpassword/${token}
    
    If you didn’t make this request, then you can ignore this email 🙂 `,
  };

  try {
    await sendEmail(mailOptions);
    console.log("reset email sent");
  } catch (error) {
    console.error(error);
    console.log("reset email not sent");
  }
}
