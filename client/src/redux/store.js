import { configureStore } from "@reduxjs/toolkit";
import app from "./app/reducer";
import courses from "./courses/reducer.js";

export default configureStore({
  reducer: {
    app: app,
    courses: courses,
  },
});
