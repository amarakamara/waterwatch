import express from "express";
const tankRouter = express.Router();
import { addTank, updateTank } from "../controllers/tank-controller.js";
import verifyToken from "../utils/verifyToken.js";

tankRouter.post("/add", verifyToken, addTank);
tankRouter.put("/update/:tid", verifyToken, updateTank);
export default tankRouter;
