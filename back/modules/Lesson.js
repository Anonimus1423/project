import mongoose from "mongoose";

const Lesson = new mongoose.Schema({
  title: String,
  description: String,
  courseId: String,
  time: String,
  created_at: String,
});

export default mongoose.model("Lesson", Lesson);
