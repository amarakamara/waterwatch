import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const TankSchema = new mongoose.Schema({
  waterlevel: { type: Number, default: 0 },
  temperature: { type: Number, default: 0 },
  turbidity: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

TankSchema.plugin(passportLocalMongoose);
const Tank = mongoose.model("Tank", TankSchema);

export default Tank;
