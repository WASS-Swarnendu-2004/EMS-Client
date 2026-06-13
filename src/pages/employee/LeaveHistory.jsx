import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const LeaveHistory = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get("/api/leaves/my");
      setLeaves(res.data);
    };

    fetch();
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
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          My Leave History
        </h1>

        {leaves.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-gray-500">
            No leave history found
          </div>
        ) : (
          <div className="grid gap-4">

            {leaves.map((leave) => (
              <div
                key={leave._id}
                className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition border"
              >

                <div className="flex justify-between items-center">

                  <h2 className="text-lg font-semibold text-gray-800">
                    {leave.reason}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                      leave.status
                    )}`}
                  >
                    {leave.status}
                  </span>

                </div>

                <p className="text-gray-500 text-sm">
                  {formatDate(leave.fromDate)} → {formatDate(leave.toDate)}
                </p>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveHistory;