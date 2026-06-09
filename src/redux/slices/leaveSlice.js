import { createSlice } from '@reduxjs/toolkit'

const loadLeaves = () => {
  try {
    const data = localStorage.getItem('leaves');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

const saveLeaves = (leaves) => {
  localStorage.setItem('leaves', JSON.stringify(leaves));
}

const leaveSlice = createSlice({
  name: "leave",

  initialState: {
    leaves: loadLeaves()
  },

  reducers: {
    addLeave: (state, action) => {
      state.leaves.push(action.payload);
      saveLeaves(state.leaves);
    },

    approveLeave: (state, action) => {
      const leave = state.leaves.find((leave) => leave.id === action.payload);
      if (leave) {
        leave.status = "Approved";
        saveLeaves(state.leaves);
      }
    },

    rejectLeave: (state, action) => {
      const leave = state.leaves.find((leave) => leave.id === action.payload);
      if (leave) {
        leave.status = "Rejected";
        saveLeaves(state.leaves);
      }
    }
  }
})

export const { addLeave, approveLeave, rejectLeave } = leaveSlice.actions;
export default leaveSlice.reducer;