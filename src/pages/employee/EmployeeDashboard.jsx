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

    const [tasksRes, leavesRes, wfhRes] = await Promise.all([
      api.get("/api/tasks/mytasks"),
      api.get("/api/leaves/my"),
      api.get("/api/wfh/my"),
    ])
    const tasks = tasksRes.data
    const leaves = leavesRes.data
    const wfh = wfhRes.data
    
    setData({
      totalTasks: tasks.length,
      completedTasks: tasks.filter(
        (task) => task.status === "Completed"
      ).length,
      pendingTasks: tasks.filter(
        (task) => task.status ==="Pending"
      ).length,

      totalLeaves: leaves.length,
      approvedLeaves: leaves.filter(
        (leave) => leave.status === "Approved"
      ).length,
      rejectedLeaves: leaves.filter(
        (leave) => leave.status === "Rejected"
      ).length,

      totalWFH: wfh.length,
      approvedWFH: wfh.filter(
        (item) => item.status === "Approved"
      ).length,
      rejectedWFH: wfh.filter(
        (item) => item.status === "Rejected"
      ).length,
    })
  } catch (error) {
    console.log(error)
    console.log(error.response);
    
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

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Tasks</h2>
          <p className="text-3xl font-bold mt-2">
              {data?.totalTasks ?? 0}
          </p>
        </div>
        <div className="bg-green-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Completed Tasks</h2>
          <p className="text-3xl font-bold mt-2">{data?.completedTasks ?? 0}</p>
        </div>

        <div className="bg-yellow-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Pending Tasks</h2>
          <p className="text-3xl font-bold mt-2">{data?.pendingTasks ?? 0}</p>
        </div>

        <div className="bg-purple-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Leaves</h2>
          <p className="text-3xl font-bold mt-2"> 
            {data?.totalLeaves ?? 0}
          </p>
        </div>

        <div className="bg-blue-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Approved Leaves</h2>
          <p className="text-3xl font-bold mt-2">{data?.approvedLeaves ?? 0}</p>
        </div>

        <div className="bg-orange-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Pending Leaves</h2>
          <p className="text-3xl font-bold mt-2">{data?.pendingLeaves ?? 0}</p>
        </div>

        <div className="bg-red-100 p-5 rounded-xl shadow">
         <h2 className="text-lg font-semibold">Rejected Leaves</h2>
         <p className="text-3xl font-bold mt-2">
           {data?.rejectedLeaves ?? 0}
         </p>
        </div>

        <div className="bg-indigo-100 p-5 rounded-xl shadow">
         <h2 className="text-lg font-semibold">Total WFH Requests</h2>
         <p className="text-3xl font-bold mt-2">
          {data?.totalWFH ?? 0}
         </p>
        </div>
        
        <div className="bg-emerald-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">   Approved WFH Requests</h2>
          <p className="text-3xl font-bold mt-2">
            {data?.approvedWFH ?? 0}
          </p>
        </div>
        
      <div className="bg-pink-100 p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold">Rejected WFH Requests</h2>
        <p className="text-3xl font-bold mt-2">
          {data?.rejectedWFH ?? 0}
        </p>
      </div>
        
      </div>
    </div>
  );
};

export default EmployeeDashboard;
