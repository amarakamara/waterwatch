import mongoose from "mongoose";
import Usage from "../models/Usage.js";
import History from "../models/History.js";
import User from "../models/User.js";

const addUsage = async (req, res, next) => {
  const { literUsed, timestamp } = req.body;

  const existingUser = User.findById({ _id: req.user._id });

  if (!existingUser) {
    return res.status(404).json("User not found");
  }
  try {
    const newUsage = new Usage({
      literUsed,
      timestamp,
      user: req.user._id,
    });
    const newHistory = new History({
      literUsed,
      timestamp,
      user: req.user._id,
    });
    await newUsage.save();
    await newHistory.save();
    return res.status(200).json("Usage Data save");
  } catch (error) {
    console.error(err);
    return res.status(500).json("Error adding usage data");
  }
};

const getUsage = async (req, res, next) => {
  console.log("user object", req.user);
  const existingUser = User.findById(req.user._id);
  if (!existingUser) {
    return res.status(404).json("User not found");
  }
  try {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);

    const waterUsages = await Usage.aggregate([
      {
        $match: {
          timestamp: { $gte: twentyFourHoursAgo, $lte: now },
        },
      },
      {
        $group: {
          _id: {
            $hour: "$timestamp",
          },
          totalLiters: { $sum: "$literUsed" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    console.log("usage data", waterUsages);
    res.status(200).json(waterUsages);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { addUsage, getUsage };
