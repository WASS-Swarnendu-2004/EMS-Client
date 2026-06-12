import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",

  initialState: {
    tasks: [],
  },

  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },

    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },

    updateTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task._id === action.payload._id
          ? action.payload
          : task
      );
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task._id !== action.payload
      );
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
} = taskSlice.actions;

export default taskSlice.reducer;