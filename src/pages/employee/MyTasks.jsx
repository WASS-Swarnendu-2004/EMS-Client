import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/tasks/mytasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (taskId) => {
    try {
      const res = await api.put(`/api/tasks/status/${taskId}`, {
        status: "Completed",
      });

      toast.success(
        res.data.message || "Task marked as completed."
      );

      fetchTasks();
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update task status."
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "🟢";

      default:
        return "🟡";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />

        <p className="text-lg font-semibold text-gray-600">
          Loading Tasks...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          My Tasks
        </h1>

        <p className="text-gray-500">
          View and manage your assigned tasks
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow p-5 border">
          <p className="text-gray-500 text-sm">Total Tasks</p>

          <h2 className="text-3xl font-bold mt-2">
            {tasks.length}
          </h2>
        </div>

        <div className="bg-yellow-50 rounded-2xl shadow p-5 border border-yellow-200">
          <p className="text-yellow-700 text-sm">Pending</p>

          <h2 className="text-3xl font-bold text-yellow-700 mt-2">
            {tasks.filter((task) => task.status === "Pending").length}
          </h2>
        </div>

        <div className="bg-green-50 rounded-2xl shadow p-5 border border-green-200">
          <p className="text-green-700 text-sm">Completed</p>

          <h2 className="text-3xl font-bold text-green-700 mt-2">
            {tasks.filter((task) => task.status === "Completed").length}
          </h2>
        </div>

        <div className="bg-blue-50 rounded-2xl shadow p-5 border border-blue-200">
          <p className="text-blue-700 text-sm">Completion Rate</p>

          <h2 className="text-3xl font-bold text-blue-700 mt-2">
            {tasks.length
              ? Math.round(
                  (tasks.filter(
                    (task) => task.status === "Completed"
                  ).length /
                    tasks.length) *
                    100
                )
              : 0}
            %
          </h2>
        </div>
      </div>

      {/* Empty State */}
      {tasks.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center shadow">
          <p className="text-gray-500">
            No Tasks Assigned
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-2xl shadow border p-5 hover:shadow-lg transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    {getStatusIcon(task.status)} {task.title}
                  </h2>

                  <p className="text-sm text-gray-500">
                    Task ID: {task._id.slice(-6).toUpperCase()}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </div>

              {/* Description */}
              <div className="mt-5">
                <p className="text-gray-500 text-sm">
                  Description
                </p>

                <p className="font-medium text-slate-700">
                  {task.description}
                </p>
              </div>

              {/* Dates */}
              <div className="mt-5 grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">
                    Due Date
                  </p>

                  <p className="font-medium text-slate-700">
                    {formatDate(task.dueDate)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Assigned On
                  </p>

                  <p className="font-medium text-slate-700">
                    {formatDate(task.createdAt)}
                  </p>
                </div>
              </div>

              {/* Button */}
              {task.status !== "Completed" && (
                <button
                  onClick={() => updateStatus(task._id)}
                  className="mt-5 bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-lg"
                >
                  Mark Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTasks;