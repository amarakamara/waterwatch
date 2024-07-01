import mongoose from "mongoose";
import Usage from "../models/Usage.js";
import History from "../models/History.js";
import User from "../models/User.js";

const addUsage = async (req, res, next) => {
  const { literUsed, timestamp } = req.body;

  const existingUser = await User.findById({ _id: req.user._id });

  if (!existingUser) {
    return res.status(404).json("User not found");
  }
  try {
    const parsedTimestamp = new Date(timestamp);
    if (isNaN(parsedTimestamp.getTime())) {
      return res.status(400).json("Invalid timestamp");
    }

    console.log("Timestamp before saving:", timestamp);
    console.log("Parsed timestamp:", parsedTimestamp);

    const newUsage = new Usage({
      literUsed,
      timestamp: parsedTimestamp,
      user: req.user._id,
    });
    const newHistory = new History({
      literUsed,
      timestamp: parsedTimestamp,
      user: req.user._id,
    });
    await newUsage.save();
    await newHistory.save();
    return res.status(200).json("Usage Data saved");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error adding usage data");
  }
};
const getUsage = async (req, res, next) => {
  try {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const waterUsages = await Usage.aggregate([
      {
        $match: {
          timestamp: { $gte: twentyFourHoursAgo, $lte: now },
        },
      },
      {
        $addFields: {
          localTime: {
            $subtract: ["$timestamp", new Date().getTimezoneOffset() * 60000],
          },
        },
      },
      {
        $group: {
          _id: { $hour: "$localTime" },
          totalLiters: { $sum: "$literUsed" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return res.status(200).json(waterUsages);
  } catch (error) {
    console.error("Error fetching water usage:", error);
    return res.status(500).send(error.message);
  }
};

export { addUsage, getUsage };
