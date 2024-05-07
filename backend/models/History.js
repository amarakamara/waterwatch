import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
  waterUsed: {
    type: Number,
    required: true,
  },
  waterTemperature: {
    type: Number,
    required: true,
  },
  waterLevel: {
    type: Number,
    required: true,
  },
  turbidity: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const History = mongoose.model("History", HistorySchema);

export default History;
