import mongoose from "mongoose";
import History from "../models/History.js";
import User from "../models/User.js";

const addHistory = async (req, res, next) => {
  const { waterUsed, waterLevel, waterTemperature, turbidity } = req.body;

  const existingUser = await User.findById(req.user._id);

  if (!existingUser) {
    return res.status(404).json("User not found");
  }

  try {
    const history = new History({
      waterUsed,
      waterTemperature,
      waterLevel,
      turbidity,
      user: req.user._id,
    });
    await history.save();
    return res.status(200).json({ message: "Histoty added", history });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error adding history");
  }
};

const deleteHistory = async (req, res, next) => {
  const historyId = req.params.hid;
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json("User not found");
  }

  try {
    const history = await History.findOneAndDelete({
      _id: historyId,
      user: req.user._id,
    });

    return res.status(200).json({
      message: "History deleted",
      history,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error deleting history");
  }
};

const getHistory = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json("User not found");
  }

  try {
    const histories = await History.find({ user: req.user._id });

    return res.status(200).json({
      message: "Histories retrieved",
      histories,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error retrieving histories");
  }
};

export { addHistory, deleteHistory, getHistory };

