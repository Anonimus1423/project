import { createSlice } from "@reduxjs/toolkit";

export const courses = createSlice({
  name: "courses",
  initialState: {
    data: [],
  },
  reducers: {
    getCoursesCompleted: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getCoursesCompleted } = courses.actions;

export default courses.reducer;
