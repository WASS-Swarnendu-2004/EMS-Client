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
    <h1 className="text-3xl font-bold mb-6">
      Admin Dashboard
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="bg-blue-100 p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold">
          Total Tasks
        </h2>
        <p className="text-3xl font-bold mt-2">
          {tasks.length}
        </p>
      </div>

      <div className="bg-green-100 p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold">
          Completed Tasks
        </h2>
        <p className="text-3xl font-bold mt-2">
          {completedCount}
        </p>
      </div>

      <div className="bg-yellow-100 p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold">
          Pending Tasks
        </h2>
        <p className="text-3xl font-bold mt-2">
          {pendingCount}
        </p>
      </div>

      <div className="bg-purple-100 p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold">
          Total Leaves
        </h2>
        <p className="text-3xl font-bold mt-2">
          {leaves.length}
        </p>
      </div>

      <div className="bg-emerald-100 p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold">
          Approved Leaves
        </h2>
        <p className="text-3xl font-bold mt-2">
          {approvedLeaves}
        </p>
      </div>

      <div className="bg-red-100 p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold">
          Rejected Leaves
        </h2>
        <p className="text-3xl font-bold mt-2">
          {rejectedLeaves}
        </p>
      </div>

      <div className="bg-orange-100 p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold">
          Pending Leaves
        </h2>
        <p className="text-3xl font-bold mt-2">
          {pendingLeaves}
        </p>
      </div>

    </div>
  </div>
);
}

export default AdminDashboard