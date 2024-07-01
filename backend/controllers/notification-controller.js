import mongoose from "mongoose";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import sendNotification from "../utils/sendNotification.js";

const addNotification = async (req, res, next) => {
  const { subject, message } = req.body;
  const existingUser = await User.findById(req.user._id);

  if (!existingUser) {
    return res.status(404).json("User not found");
  }

  try {
    const newNotification = new Notification({
      subject,
      message,
      user: req.user._id,
    });
    await newNotification.save();

    const notification = {
      subject,
      message,
    };
    const email = existingUser.username;
    await sendNotification(email, notification);
    return res
      .status(200)
      .json({ message: "Notification added", notification });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error adding notification");
  }
};

const deleteNotification = async (req, res, next) => {
  const notificationId = req.params.nid;
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json("User not found");
  }

  try {
    const deletedNotification = await Notification.findOneAndDelete({
      _id: notificationId,
      user: req.user._id,
    });

    return res.status(200).json({
      message: "Notification deleted",
      deletedNotification,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error deleting notification");
  }
};

const getNotification = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json("User not found");
  }

  try {
    const notifications = await Notification.find({ user: req.user._id });

    return res.status(200).json({
      message: "Notifications retrieved",
      notifications,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error retrieving notifications");
  }
};

export { addNotification, deleteNotification, getNotification };
