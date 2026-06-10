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

    if (!reason || !fromDate || !toDate) {
      alert("Please fill all fields")
      return;
    }
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
    <h1 className="text-3xl font-bold mb-6">
      Apply Leave
    </h1>

    <div className="bg-white rounded-xl shadow p-6 max-w-lg">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Enter Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Apply Leave
        </button>
      </form>
    </div>
  </div>
);

}

export default ApplyLeave