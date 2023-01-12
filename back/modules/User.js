import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: String,
  password: String,
  mail: Boolean,
});

export default mongoose.model("User", User);
