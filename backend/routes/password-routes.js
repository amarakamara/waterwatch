import express from "express";
const passwordRouter = express.Router();
import verifyToken from "../utils/verifyToken.js";

import {
  forgotPassword,
  resetPassword,
} from "../controllers/password-controller.js";

passwordRouter.post("/forgotpassword", forgotPassword);
passwordRouter.put("/resetpassword/:token", resetPassword);

export default passwordRouter;
