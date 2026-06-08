import { configureStore } from "@reduxjs/toolkit";
import leaveReducer from "./slices/leaveSlice.js";
import taskReducer from "./slices/taskSlice.js"

export const store = configureStore({
  reducer: {
    leave: leaveReducer,
    task: taskReducer,
  }
})