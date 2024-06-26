import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
  literUsed: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

const History = mongoose.model("History", HistorySchema);

export default History;
