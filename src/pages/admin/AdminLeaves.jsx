import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    const res = await api.get("/api/leaves");
    setLeaves(res.data);
  };

  const approve = async (id) => {
    await api.put(`/api/leaves/approve/${id}`);
    fetchLeaves();
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const formatDate = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

  const statusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Leave Management (Admin)
          </h1>
          <p className="text-gray-500">
            Approve or manage employee leave requests
          </p>
        </div>

        <div className="grid gap-4">

          {leaves.map((leave) => (
            <div
              key={leave._id}
              className="bg-white p-5 rounded-2xl shadow border hover:shadow-lg transition"
            >

              <div className="flex justify-between items-center">

                <div>
                  <h2 className="font-semibold text-gray-800">
                    {leave.reason}
                  </h2>

                  <p className="text-gray-500     text-sm">{formatDate(leave. fromDate)} → {formatDate(leave.  toDate)}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                    leave.status
                  )}`}
                >
                  {leave.status}
                </span>

              </div>

              {leave.status === "Pending" && (
                <div className="mt-4 flex gap-3">

                  <button
                    onClick={() => approve(leave._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition"
                  >
                    Approve
                  </button>

                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    Reject
                  </button>

                </div>
              )}

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default AdminLeaves;