import { configureStore } from "@reduxjs/toolkit";
import app from "./app/reducer";

export default configureStore({
  reducer: {
    app: app,
  },
});
