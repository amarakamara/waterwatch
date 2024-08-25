import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Enforce unique username
  },
  resetPasswordToken: {
    type: String,
    required: false,
  },
});

// Passport-Local-Mongoose Plugin adds username and hash fields automatically
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

export default User;
