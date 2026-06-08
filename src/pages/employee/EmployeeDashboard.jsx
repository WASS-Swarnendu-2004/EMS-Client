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
      <h2>Employee Dashboard</h2>

      <p>My Tasks (Completed): {completedTasks}</p>
      <p>My Tasks (Pending): {pendingTasks}</p>

      <hr />

      <p>My Leaves (Approved): {approvedLeaves}</p>
      <p>My Leaves (Pending): {pendingLeaves}</p>
    </div>
  );
};

export default EmployeeDashboard;