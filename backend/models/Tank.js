import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const TankSchema = new mongoose({
  productId: String,
  waterLevel: Number,
  turbidity: Number,
  temperature: Number,
});

TankSchema.plugin(passportLocalMongoose);
const Tank = mongoose.model("Tank", TankSchema);

export default Tank;
