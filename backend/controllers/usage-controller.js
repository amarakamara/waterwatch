import mongoose from "mongoose";
import Usage from "../models/Usage.js";
import User from "../models/User.js";

const addUsage = async (req, res, next) => {
  const { waterUsage, timestamp, userid } = req.body;

  const existingUser = User.findById({ _id: req.user._id });

  if (!existingUser) {
    return res.status(404).json("User not found");
  }
  try {
    const newUsage = new Usage({
      waterUsage,
      timestamp,
      user: req.user._id,
    });
    await newUsage.save();
    return res.status(200).json("Usage Data save");
  } catch (error) {
    console.error(err);
    return res.status(500).json("Error adding usage data");
  }
};

const getUsage = async (req, res, next) => {
  const existingUser = User.findById({ _id: req.user._id });
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

    res.status(200).json(waterUsages);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { addUsage, getUsage };
