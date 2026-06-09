import { createSlice } from "@reduxjs/toolkit";


const loadTasks = () => {
  try {
    const data = localStorage.getItem('tasks')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const taskSlice = createSlice({
  name: "task",

  initialState: {
    tasks:loadTasks()
  },

  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
      saveTasks(state.tasks)
    },

    completeTask: (state, action) => {
      const task = state.tasks.find((task) => 
        task.id === action.payload)
      
      if (task) {
        task.status = "Completed"
        saveTasks(state.tasks)
      }
    }
  }
})

export const {addTask ,completeTask
} = taskSlice.actions;

export default taskSlice.reducer;