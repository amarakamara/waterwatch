import express from "express";
const notificationRouter = express.Router();
import verifyToken from "../utils/verifyToken.js";
import {
  addNotification,
  deleteNotification,
  getNotification,
} from "../controllers/notification-controller.js";

notificationRouter.get("/", verifyToken, getNotification);
notificationRouter.post("/add", verifyToken, addNotification);
notificationRouter.delete("/delete/:nid", verifyToken, deleteNotification);

export default notificationRouter;
