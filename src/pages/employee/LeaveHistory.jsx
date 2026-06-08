import React from 'react'
import { useSelector } from 'react-redux'


const LeaveHistory = () => {

    const leaves = useSelector(
      (state) => state.leave.leaves
    )
  return (
    <div>
      <h3>Leave History</h3>
      {leaves.map((leave) => (
        <div key={leave.id}>
          <p>Reason: {leave.reason}</p>
          <p>From: {leave.fromDate}</p>
          <p>To: {leave.toDate}</p>
          <p>Status: {leave.status}</p>
        </div>
      ))}
    </div>
  )
}

export default LeaveHistory