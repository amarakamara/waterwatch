import express from "express";
const userRouter = express.Router();
import {
  getUser,
  register,
  login,
  logout,
} from "../controllers/user-controller.js";

userRouter.get("/getuser/:id", getUser);
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

export default userRouter;
