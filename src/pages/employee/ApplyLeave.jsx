import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addLeave } from '../../redux/slices/leaveSlice.js'

const ApplyLeave = () => {
  const [reason, setReason] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLeave = {
      id: Date.now(),
      reason,
      fromDate,
      toDate,
      status: "Pending"
    }

    dispatch(addLeave(newLeave))

    setReason("")
    setFromDate("")
    setToDate("")
    
  }

  return (
    <div>
      <h2>Apply Leave</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Enter Reason'
          value={reason}
          onChange={(e)=>setReason(e.target.value)}
        />
        <input
          type="date"
          value={fromDate}
          onChange={(e)=>setFromDate(e.target.value)}
        />
        <input
          type="date"
          value={toDate}
          onChange={(e)=>setToDate(e.target.value)}
        />

        <button type='submit'>Apply</button>
      </form>

    </div>
  )
}

export default ApplyLeave