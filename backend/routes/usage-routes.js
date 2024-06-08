import express from "express";
const usageRouter = express.Router();
import verifyToken from "../utils/verifyToken.js";

import { addUsage, getUsage } from "../controllers/usage-controller.js";

usageRouter.get("/", verifyToken, getUsage);
usageRouter.post("/add", verifyToken, addUsage);
export default usageRouter;
