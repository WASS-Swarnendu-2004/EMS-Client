import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import api from "../../api/axios";

const AdminLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
   try {
     setLoading(true)
     const res = await api.get("/api/leaves")
     setLeaves(res.data)
   } catch (error) {
     console.log(error);
       toast.error(error?.response?.data?.message ||"Failed to load leaves."
     )
   } finally {
     setLoading(false)
   }
 }

  const approve = async (id) => {
    await api.put(`/api/leaves/approve/${id}`);
    fetchLeaves();
  };

  const reject = async (id) => {
    try {
      await api.put(`/api/leaves/reject/${id}`);

      toast.success("Leave Rejected");

      fetchLeaves();
    } catch (error) {
      console.log(error);

      toast.error("Failed To Reject Leave");
    }
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

  const calculateDays = (fromDate, toDate) => {
    const start = new Date(fromDate);
    const end = new Date(toDate);

    const difference = end.getTime() - start.getTime();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;

    return days;
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

  const validLeaves = leaves.filter((leave) => leave.employeeId)

  if (loading) {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />

      <p className="text-lg font-semibold text-gray-600">
        Loading leave requests...
      </p>
    </div>
  );
}

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow p-5 border">
            <p className="text-gray-500 text-sm">Total Leaves</p>

            <h2 className="text-3xl font-bold mt-2">{validLeaves.length}</h2>
          </div>

          <div className="bg-yellow-50 rounded-2xl shadow p-5 border border-yellow-200">
            <p className="text-yellow-700 text-sm">Pending</p>

            <h2 className="text-3xl font-bold mt-2 text-yellow-700">
              {validLeaves.filter((leave) => leave.status === "Pending").length}
            </h2>
          </div>

          <div className="bg-green-50 rounded-2xl shadow p-5 border border-green-200">
            <p className="text-green-700 text-sm">Approved</p>

            <h2 className="text-3xl font-bold mt-2 text-green-700">
              {validLeaves.filter((leave) => leave.status === "Approved").length}
            </h2>
          </div>

          <div className="bg-red-50 rounded-2xl shadow p-5 border border-red-200">
            <p className="text-red-700 text-sm">Rejected</p>

            <h2 className="text-3xl font-bold mt-2 text-red-700">
              {leaves.filter((leave) => leave.status === "Rejected").length}
            </h2>
          </div>
        </div>
        <div className="grid gap-4">
          {validLeaves.map((leave) => (
            <div
              key={leave._id}
              className="bg-white p-5 rounded-2xl shadow border hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {leave.employeeId?.name || "Unknown Employee"}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {leave.employeeId?.email || "No Email"}
                  </p>

                  <div className="mt-3">
                    <p className="font-medium text-gray-700">Reason</p>

                    <p className="text-gray-600">{leave.reason}</p>
                  </div>

                  <div className="mt-3 space-y-1">
                    <p className="text-sm text-gray-500">
                      📅 {formatDate(leave.fromDate)} →{" "}
                      {formatDate(leave.toDate)}
                    </p>

                    <p className="text-sm font-medium text-blue-600">
                      ⏳ {calculateDays(leave.fromDate, leave.toDate)} Days
                    </p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                    leave.status,
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
                    onClick={() => reject(leave._id)}
                    className=" bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
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
