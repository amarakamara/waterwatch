import express from "express";
const historyRouter = express.Router();
import verifyToken from "../utils/verifyToken.js";

import {
  addHistory,
  deleteHistory,
  getHistory,
} from "../controllers/history-controller.js";

historyRouter.get("/", verifyToken, getHistory);
historyRouter.post("/add", verifyToken, addHistory);
historyRouter.delete("/delete/:hid", verifyToken, deleteHistory);
export default historyRouter;
