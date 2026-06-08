import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",

  initialState: {
    tasks:[]
  },

  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    },

    completeTask: (state, action) => {
      const task = state.tasks.find((task) => 
        task.id === action.payload)
      
      if (task) {
        task.status = "Completed"
      }
    }
  }
})

export const {addTask ,completeTask
} = taskSlice.actions;

export default taskSlice.reducer;