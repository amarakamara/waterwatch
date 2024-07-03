import dotenv from "dotenv";
dotenv.config();
import sendEmail from "./sendMail.js";

export default async function sendNotification(recipientmail, notification) {
  const mailOptions = {
    user: process.env.MY_EMAIL,
    password: process.env.MY_PASSWORD,
    from: process.env.MY_EMAIL,
    to: recipientmail,
    subject: `${notification.subject}`,
    text: `${notification.message}`,
  };

  try {
    await sendEmail(mailOptions);
    console.log("Notification sent");
  } catch (error) {
    console.error(error);
    console.log("Notification not sent");
  }
}
