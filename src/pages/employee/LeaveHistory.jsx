import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const LeaveHistory = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaveHistory = async () => {
    try {
      const res = await api.get("/api/leaves/my");
      setLeaves(res.data);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to load leave history."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveHistory();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "🟢";

      case "rejected":
        return "🔴";

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Leave History
        </h1>

        <p className="text-gray-500">
          View all your Leave requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow p-5 border">
          <p className="text-gray-500 text-sm">Total Requests</p>

          <h2 className="text-3xl font-bold mt-2">
            {leaves.length}
          </h2>
        </div>

        <div className="bg-yellow-50 rounded-2xl shadow p-5 border border-yellow-200">
          <p className="text-yellow-700 text-sm">Pending</p>

          <h2 className="text-3xl font-bold text-yellow-700 mt-2">
            {leaves.filter((item) => item.status === "Pending").length}
          </h2>
        </div>

        <div className="bg-green-50 rounded-2xl shadow p-5 border border-green-200">
          <p className="text-green-700 text-sm">Approved</p>

          <h2 className="text-3xl font-bold text-green-700 mt-2">
            {leaves.filter((item) => item.status === "Approved").length}
          </h2>
        </div>

        <div className="bg-red-50 rounded-2xl shadow p-5 border border-red-200">
          <p className="text-red-700 text-sm">Rejected</p>

          <h2 className="text-3xl font-bold text-red-700 mt-2">
            {leaves.filter((item) => item.status === "Rejected").length}
          </h2>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />

          <p className="text-lg font-semibold text-gray-600">
            Loading Leave Requests...
          </p>
        </div>
      ) : leaves.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center shadow">
          <p className="text-gray-500">
            No Leave Requests Found
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {leaves.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow border p-5 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    {getStatusIcon(item.status)} {item.status} Leave Request
                  </h2>

                  <p className="text-sm text-gray-500">
                    Request ID: {item._id.slice(-6).toUpperCase()}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>

              <div className="mt-5 grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">
                    Leave From
                  </p>

                  <p className="font-medium text-slate-700">
                    {formatDate(item.fromDate)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Leave To
                  </p>

                  <p className="font-medium text-slate-700">
                    {formatDate(item.toDate)}
                  </p>
                </div>
              </div>

              {item.reason && (
                <div className="mt-5">
                  <p className="text-sm text-gray-500">
                    Reason
                  </p>

                  <p className="font-medium text-slate-700">
                    {item.reason}
                  </p>
                </div>
              )}

              <div className="mt-5 grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">
                    Applied On
                  </p>

                  <p className="font-medium text-slate-700">
                    {formatDate(item.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Last Updated
                  </p>

                  <p className="font-medium text-slate-700">
                    {formatDate(item.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaveHistory;