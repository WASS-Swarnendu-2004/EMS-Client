import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminWFH = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWFHRequests = async () => {
    try {
      const res = await api.get("/api/wfh");

      setRequests(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch WFH requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWFHRequests();
  }, []);

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await api.put(
        `/api/wfh/approve/${id}`,
        { status }
      );

      alert(
        `WFH Request ${status}`
      );

      fetchWFHRequests();
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data
          ?.message ||
          "Failed to update status"
      );
    }
  };

  const getStatusColor = (
    status
  ) => {
    switch (
      status?.toLowerCase()
    ) {
      case "approved":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading WFH Requests...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Work From Home Requests
        </h1>

        <p className="text-gray-500">
          Review and manage employee
          WFH applications
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-600 text-white p-5 rounded-2xl">
          <p>Total Requests</p>

          <h2 className="text-3xl font-bold">
            {requests.length}
          </h2>
        </div>

        <div className="bg-green-600 text-white p-5 rounded-2xl">
          <p>Approved</p>

          <h2 className="text-3xl font-bold">
            {
              requests.filter(
                (r) =>
                  r.status?.toLowerCase() ===
                  "approved"
              ).length
            }
          </h2>
        </div>

        <div className="bg-yellow-500 text-white p-5 rounded-2xl">
          <p>Pending</p>

          <h2 className="text-3xl font-bold">
            {
              requests.filter(
                (r) =>
                  r.status?.toLowerCase() ===
                  "pending"
              ).length
            }
          </h2>
        </div>
      </div>

      {/* Desktop Table */}

      <div className="hidden md:block bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">
                Employee
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Start Date
              </th>

              <th className="p-4 text-left">
                End Date
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {requests.map(
              (request) => (
                <tr
                  key={request._id}
                  className="border-b"
                >
                  <td className="p-4">
                    {request.employeeId
                      ?.name ||
                      "N/A"}
                  </td>

                  <td className="p-4">
                    {request.employeeId
                      ?.email ||
                      "N/A"}
                  </td>

                  <td className="p-4">
                    {request.startDate
                      ? new Date(
                          request.startDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="p-4">
                    {request.endDate
                      ? new Date(
                          request.endDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </td>

                  <td className="p-4 flex gap-2">
                    {request.status?.toLowerCase() ===
                    "pending" ? (
                      <>
                        <button
                          onClick={() =>
                            updateStatus(
                              request._id,
                              "Approved"
                            )
                          }
                          className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              request._id,
                              "Rejected"
                            )
                          }
                          className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500">
                        Updated
                      </span>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}

      <div className="md:hidden space-y-4">
        {requests.map(
          (request) => (
            <div
              key={request._id}
              className="bg-white rounded-2xl shadow p-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold">
                  {request.employeeId
                    ?.name ||
                    "N/A"}
                </h3>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    request.status
                  )}`}
                >
                  {request.status}
                </span>
              </div>

              <p className="text-gray-600 mt-2">
                {
                  request.employeeId
                    ?.email
                }
              </p>

              <p className="mt-2 text-sm">
                <strong>
                  Start:
                </strong>{" "}
                {request.startDate
                  ? new Date(
                      request.startDate
                    ).toLocaleDateString()
                  : "N/A"}
              </p>

              <p className="text-sm">
                <strong>End:</strong>{" "}
                {request.endDate
                  ? new Date(
                      request.endDate
                    ).toLocaleDateString()
                  : "N/A"}
              </p>

              {request.status?.toLowerCase() ===
                "pending" && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() =>
                      updateStatus(
                        request._id,
                        "Approved"
                      )
                    }
                    className="flex-1 bg-green-600 text-white py-2 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        request._id,
                        "Rejected"
                      )
                    }
                    className="flex-1 bg-red-600 text-white py-2 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdminWFH;