import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  subject: {
    required: true,
    type: String,
  },
  message: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
