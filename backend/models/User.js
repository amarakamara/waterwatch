import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.plugin(passportLocalMongoose);

UserSchema.path("password").validate(function (value) {
  return /^[a-zA-Z0-9]+@[a-z0-9]+\.[A-Za-z]{2,15}$/.test(value);
}, "Invalid Username");

const User = mongoose.model("User", UserSchema);

export default User;
