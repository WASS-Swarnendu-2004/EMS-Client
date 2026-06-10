import React from "react";
import { useSelector } from "react-redux";

const EmployeeDashboard = () => {
  const tasks = useSelector((state) => state.task.tasks);
  const leaves = useSelector((state) => state.leave.leaves);

  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const pendingTasks = tasks.filter(t => t.status === "Pending").length;

  const approvedLeaves = leaves.filter(l => l.status === "Approved").length;
  const pendingLeaves = leaves.filter(l => l.status === "Pending").length;

  return (
  <div>
    <h1 className="text-3xl font-bold mb-6">
      Employee Dashboard
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="bg-green-100 p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold">
          Completed Tasks
        </h2>
        <p className="text-3xl font-bold mt-2">
          {completedTasks}
        </p>
      </div>

      <div className="bg-yellow-100 p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold">
          Pending Tasks
        </h2>
        <p className="text-3xl font-bold mt-2">
          {pendingTasks}
        </p>
      </div>

      <div className="bg-blue-100 p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold">
          Approved Leaves
        </h2>
        <p className="text-3xl font-bold mt-2">
          {approvedLeaves}
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
};

export default EmployeeDashboard;