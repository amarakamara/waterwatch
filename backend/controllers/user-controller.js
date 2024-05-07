import mongoose from "mongoose";
import User from "../models/User.js";

const getUser = async (req, res, next) => {
  const userId = req.params.id;
  let user;

  try {
    user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    delete user.password;
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Missing fields",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    name,
    email,
  };

  try {
    await User.register(newUser, hashedPassword, (err, user) => {
      if (err) {
        return res.status(500).json({
          message: "Something went wrong, try again.",
          authenticated: false,
        });
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
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res, next) => {
  passport.authenticate("local", { session: true }, (err, user, info) => {
    if (err) {
      console.log("Error in authentication at login");
      return res.status(500).json({
        message: "Something went wrong, try again",
        authenticated: false,
      });
    }

    if (!user) {
      return res.status(401).json({
        message: "Wrong email or password",
        authenticated: false,
      });
    }

    const token = jwt.sign({ _id: user._id }, jwtSecret, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      authenticated: true,
    });
  })(req, res, next);
};

const logout = async (req, res, next) => {
  return res.status(200).json({ message: "Logged out successfully" });
};

export { getUser, register, login, logout };
