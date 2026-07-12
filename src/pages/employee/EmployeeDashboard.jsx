import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import {Loader2} from "lucide-react"

const EmployeeDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
  try {
    setLoading(true)

    const res = await api.get("/api/dashboard/employee");
    setData(res.data)
  } catch (error) {
    setError("Failed to load dashboard.")
    toast.error(
      error?.response?.data?.message ||
      "Failed to load dashboard."
    )
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin"/>
        <p className="text-lg font-semibold text-gray-600">
          Loading Dashboard..
        </p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center text-xl">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Completed Tasks</h2>
          <p className="text-3xl font-bold mt-2">{data.completedTasks ?? 0}</p>
        </div>

        <div className="bg-yellow-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Pending Tasks</h2>
          <p className="text-3xl font-bold mt-2">{data.pendingTasks ?? 0}</p>
        </div>

        <div className="bg-blue-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Approved Leaves</h2>
          <p className="text-3xl font-bold mt-2">{data.approvedLeaves ?? 0}</p>
        </div>

        <div className="bg-orange-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Pending Leaves</h2>
          <p className="text-3xl font-bold mt-2">{data.pendingLeaves ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
