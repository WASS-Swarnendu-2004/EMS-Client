import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/dashboard/admin");

      setData(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load dashboard");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center text-xl">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

       
        <div className="bg-blue-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Tasks</h2>
          <p className="text-3xl font-bold mt-2">
            {data.totalTasks}
          </p>
        </div>

        <div className="bg-green-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Completed Tasks</h2>
          <p className="text-3xl font-bold mt-2">
            {data.completedTasks}
          </p>
        </div>

        <div className="bg-yellow-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Pending Tasks</h2>
          <p className="text-3xl font-bold mt-2">
            {data.pendingTasks}
          </p>
        </div>

      
        <div className="bg-purple-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Leaves</h2>
          <p className="text-3xl font-bold mt-2">
            {data.totalLeaves}
          </p>
        </div>

        <div className="bg-emerald-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">
            Approved Leaves
          </h2>
          <p className="text-3xl font-bold mt-2">
            {data.approvedLeaves}
          </p>
        </div>

        <div className="bg-red-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">
            Rejected Leaves
          </h2>
          <p className="text-3xl font-bold mt-2">
            {data.rejectedLeaves}
          </p>
        </div>

        <div className="bg-orange-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">
            Pending Leaves
          </h2>
          <p className="text-3xl font-bold mt-2">
            {data.pendingLeaves}
          </p>
        </div>

       
        <div className="bg-indigo-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">
            Approved WFH Requests
          </h2>
          <p className="text-3xl font-bold mt-2">
            {data.approvedWFH}
          </p>
        </div>

        <div className="bg-pink-100 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">
            Pending WFH Requests
          </h2>
          <p className="text-3xl font-bold mt-2">
            {data.pendingWFH}
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;