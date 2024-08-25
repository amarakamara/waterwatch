import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

// Get user by ID
const getUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).select("-hash -salt");
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Register a new user
const register = async (req, res, next) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    User.register(new User({ username, name }), password, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "User already exists" });
      }
      const token = jwt.sign({ _id: user._id }, jwtSecret, {
        expiresIn: "24h",
      });
      return res.status(200).json({
        message: "User created successfully",
        authenticated: true,
        token,
      });
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong, try again." });
  }
};

// Login a user
const login = async (req, res, next) => {
  const { username, password } = req.body;

  console.log("All users :", await User.find().select("-hash -salt"));

  if (!username || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found!", authenticated: false });
    }

    User.authenticate()(username, password, (err, user, options) => {
      if (err || !user) {
        return res
          .status(401)
          .json({
            message: "Wrong username or password!",
            authenticated: false,
          });
      }
      const token = jwt.sign({ _id: user._id }, jwtSecret, {
        expiresIn: "24h",
      });
      return res.status(200).json({
        message: "Login successful",
        token,
        userId: user._id,
        authenticated: true,
      });
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong, try again." });
  }
};

// Logout a user
const logout = async (req, res, next) => {
  return res.status(200).json({ message: "Logged out successfully" });
};

export { getUser, register, login, logout };
