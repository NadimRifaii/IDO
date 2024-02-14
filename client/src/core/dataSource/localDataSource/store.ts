import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice/userSlice";
import tasksSlice from "./tasksSlice/tasksSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    tasks: tasksSlice
  }
})