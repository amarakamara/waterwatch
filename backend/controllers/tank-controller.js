import mongoose from "mongoose";
import Tank from "../models/Tank.js";
import User from "../models/User.js";

const addTank = async (req, res, next) => {
  let existingUser;

  try {
    existingUser = await User.findById(req.user._id);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: " Unautorized" });
  }

  const tank = new Tank({
    waterlevel: 0,
    temperature: 0,
    turbidity: 0,
    user: req.user._id,
  });

  try {
    await tank.save();
    return res.status(201).json({ message: "Tank created", tank });
  } catch (err) {
    return res.status(500).json({ message: "Error creating tank" });
    console.error(err);
  }
};

const updateTank = async (req, res, next) => {
  const tankId = req.params.tid;

  const { waterLevel, temperature, turbidity } = req.body;

  let tank;

  try {
    tank = await Tank.findOneAndUpdate(
      { _id: tankId, user: req.user._id },
      {
        waterLevel,
        temperature,
        turbidity,
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error updating tank" });
  }

  if (!tank) {
    return res.status(404).json({ message: "Tank not found" });
  }
  return res.status(200).json({ tank });
};

export { addTank, updateTank };
