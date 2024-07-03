import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import generateRandomToken from "../utils/generateRandomToken.js";
import sendResetPasswordMail from "../utils/sendResetPasswordMail.js";
import User from "../models/User.js";

const JWTsecret = process.env.JWT_SECRET;

const forgotPassword = async (req, res, next) => {
  console.log("Here to reset");
  const email = req.body.email;

  const existingUser = await User.findOne({
    username: email,
  });

  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "No user found with that username!" });
  }
  try {
    const token = generateRandomToken(existingUser, "10m");

    existingUser.resetPasswordToken = token;
    await existingUser.save();

    try {
      console.log("About to send mail");
      await sendResetPasswordMail(email, token);
      return res.status(200).json({ message: "password reset email sent!" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Server Error, reset email not sent" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

const resetPassword = async (req, res, next) => {
  let { newPassword } = req.body;

  const resetToken = req.params.token;

  const existingUser = await User.findOne({ resetPasswordToken: resetToken });

  if (!existingUser) {
    return res.status(400).json({ message: "Invalid reset token" });
  }

  try {
    const decodedToken = jwt.verify(resetToken, JWTsecret);

    if (Date.now() >= decodedToken.exp * 1000) {
      return res.status(401).json({ error: "Token has expired" });
    }

    newPassword = await bcrypt.hash(newPassword, 10);
    existingUser.password = newPassword;
    existingUser.resetPasswordToken = undefined;

    await existingUser.save();
    return res.status(200).json("Password reset successful");
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Invalid or expired reset token." });
  }
};

export { forgotPassword, resetPassword };
