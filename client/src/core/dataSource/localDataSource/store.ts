import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice/userSlice";
import tasksSlice from "./tasksSlice/tasksSlice";
import querySlice from "./currentQuery/querySlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    tasks: tasksSlice,
    query: querySlice
  }
})