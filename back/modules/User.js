import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: String,
  password: String,
  mail: String,
  mailService: Boolean,
});

export default mongoose.model("User", User);
