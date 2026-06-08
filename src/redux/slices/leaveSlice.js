import { createSlice } from '@reduxjs/toolkit'

const leaveSlice = createSlice({
  name: "leave",
  
  initialState: {
    leaves: []
  },

  reducers: {
    addLeave: (state, action) => {
      console.log("SLICE HIT:", action.payload);
      state.leaves.push(action.payload)
    },

    approveLeave: (state, action) => {
      const leave = state.leaves.find((leave) => leave.id === action.payload)
      
      if (leave) {
        leave.status = "Approved";
      }
    },

    rejectLeave: (state, action) => {
      const leave = state.leaves.find((leave) =>
      leave.id === action.payload)
      
      if (leave) {
        leave.status = "Rejected"
      }
    }
  }

})

export const { addLeave, approveLeave, rejectLeave } = leaveSlice.actions;
export default leaveSlice.reducer;