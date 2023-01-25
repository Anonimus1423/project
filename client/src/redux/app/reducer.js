import { createSlice } from "@reduxjs/toolkit";

export const app = createSlice({
  name: "app",
  initialState: {
    role: 0,
    app: null,
  },
  reducers: {
    initApp: (state, action) => {
      state.app = action.payload;
      if (action.payload.isAdmin) {
        state.role = 2;
        return;
      }
      state.role = 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initApp } = app.actions;

export default app.reducer;
