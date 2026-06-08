import React from 'react' 
import { useSelector } from "react-redux"

const AdminDashboard = () => {

  const tasks = useSelector(
    (state) => state.task.tasks
  )
  const leaves = useSelector(
    (state) => state.leave.leaves
  )

  const completedCount = tasks.filter(
    (task) => task.status === "Completed"
  ).length

  const pendingCount = tasks.filter(
    (task) => task.status === "Pending"
  ).length

  const approvedLeaves = leaves.filter(
   (leave) => leave.status === "Approved"
  ).length;

  const pendingLeaves = leaves.filter(
   (leave) => leave.status === "Pending"
  ).length;

  const rejectedLeaves = leaves.filter(
   (leave) => leave.status === "Rejected"
  ).length;
  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      <p>Total Tasks: {tasks.length}</p>
      <p>Completed tasks: {completedCount}</p>
      <p>Pending tasks: {pendingCount}</p>
      <hr />
      <p>Total Leaves: {leaves.length}</p>
      <p>Approved Leaves: {approvedLeaves}</p>
      <p>Rejected Leaves: {rejectedLeaves}</p>
      <p>Pending Leaves: {pendingLeaves}</p>
    </div>
  )
}

export default AdminDashboard