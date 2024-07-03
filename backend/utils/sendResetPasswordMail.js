import dotenv from "dotenv";
dotenv.config();
import sendEmail from "./sendMail.js";

export default async function sendResetPasswordMail(email, token) {
  console.log("About to send email");
  const mailOptions = {
    user: process.env.MY_EMAIL,
    password: process.env.MY_PASSWORD,
    from: process.env.MY_EMAIL,
    to: email,
    subject: "Please verify your WaterWatch account.",
    text: `Hey there,

    Someone requested a new password for your [customer portal] account.
    
    Click this link to reset your password: http://localhost:3001/newpassword/${token}
    
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
