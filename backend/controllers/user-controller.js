import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

const getUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    delete user.password;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username: email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, jwtSecret, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      message: "User created successfully",
      authenticated: true,
      token,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong, try again." });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Wrong email or password", authenticated: false });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Wrong email or password", authenticated: false });
    }

    const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: "24h" });
    const userId = user._id;

    return res.status(200).json({
      message: "Login successful",
      token,
      userId,
      authenticated: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong, try again." });
  }
};

const logout = async (req, res, next) => {
  return res.status(200).json({ message: "Logged out successfully" });
};

export { getUser, register, login, logout };
