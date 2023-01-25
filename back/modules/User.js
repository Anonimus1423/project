import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: String,
  password: String,
  mail: String,
  date: String,
});

export default mongoose.model("User", User);
