import mongoose from "mongoose";

const Quiz = new mongoose.Schema({
  title: String,
  description: String,
  answers: Array,
  answerIndex: String | Number,
  lessonId: String,
  slug: String,
});

export default mongoose.model("Quiz", Quiz);
