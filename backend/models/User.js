import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  resetPasswordToken: { type: String, required: false },
});

UserSchema.path("password").validate(function (value) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  return passwordRegex.test(value);
}, "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character");

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

export default User;
