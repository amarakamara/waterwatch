import mongoose from "mongoose";

const UsageSchema = new mongoose.Schema({
  literUsed: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Usage = mongoose.model("Usage", UsageSchema);

export default Usage;
