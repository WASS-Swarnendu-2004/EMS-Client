import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {Loader2} from "lucide-react"
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
      toast.error("Failed to fetch WFH requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWFHRequests();
  }, []);

 const updateStatus = async (id,status) => {
  try {
     const endpoint = status === "Approved"
        ? `/api/wfh/approve/${id}`
        : `/api/wfh/reject/${id}`;

    const res = await api.put(endpoint);

    toast.success(
      res.data.message ||`WFH Request ${status}`
    );

    fetchWFHRequests();

  } catch (error) {

    console.log(error);

    toast.error(
      error?.response?.data?.message ||"Failed to update status"
    );

  }
};
  

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

  if (loading) {
    return (
      <div className="flex flex-col items-center h-[70vh] gap-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-lg font-semibold text-gray-600">
            Loading WFH Requests...
        </p>

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

  <div className="bg-white rounded-2xl shadow p-5 border">
    <p className="text-gray-500 text-sm">
      Total Requests
    </p>

    <h2 className="text-3xl font-bold mt-2">
      {requests.length}
    </h2>
  </div>

  <div className="bg-yellow-50 rounded-2xl shadow p-5 border border-yellow-200">
    <p className="text-yellow-700 text-sm">
      Pending
    </p>

    <h2 className="text-3xl font-bold text-yellow-700 mt-2">
      {
        requests.filter(
          (request) => request.status === "Pending"
        ).length
      }
    </h2>
  </div>

  <div className="bg-green-50 rounded-2xl shadow p-5 border border-green-200">
    <p className="text-green-700 text-sm">
      Approved
    </p>

    <h2 className="text-3xl font-bold text-green-700 mt-2">
      {
        requests.filter(
          (request) => request.status === "Approved"
        ).length
      }
    </h2>
  </div>

  <div className="bg-red-50 rounded-2xl shadow p-5 border border-red-200">
    <p className="text-red-700 text-sm">
      Rejected
    </p>

    <h2 className="text-3xl font-bold text-red-700 mt-2">
      {
        requests.filter(
          (request) => request.status === "Rejected"
        ).length
      }
    </h2>
  </div>

</div>

<div className="grid gap-5">

  {requests.map((request) => (

    <div
      key={request._id}
      className="
      bg-white
      rounded-2xl
      shadow
      border
      p-6
      hover:shadow-lg
      transition
      "
    >

      {/* Top */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            {request.employeeId?.name || "Unknown Employee"}
          </h2>

          <p className="text-gray-500">
            {request.employeeId?.email || "No Email"}
          </p>

        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm font-medium w-fit ${getStatusColor(
            request.status
          )}`}
        >
          {request.status}
        </span>

      </div>

      {/* Details */}

      <div className="grid md:grid-cols-2 gap-4 mt-6">

        <div>

          <p className="text-sm text-gray-500">
            Applied On
          </p>

          <p className="font-medium">
            {new Date(
              request.createdAt
            ).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>

        </div>

        <div>

          <p className="text-sm text-gray-500">
            Last Updated
          </p>

          <p className="font-medium">
            {new Date(
              request.updatedAt
            ).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>

        </div>

      </div>

      {/* WFH Duration */}

      {(request.startDate || request.endDate) && (

        <div className="mt-5">

          <p className="text-sm text-gray-500">
            WFH Duration
          </p>

          <p className="font-medium">

            {request.startDate
              ? new Date(
                  request.startDate
                ).toLocaleDateString("en-IN")
              : "N/A"}

            {" "}→{" "}

            {request.endDate
              ? new Date(
                  request.endDate
                ).toLocaleDateString("en-IN")
              : "N/A"}

          </p>

        </div>

      )}

      {/* Actions */}

      {request.status === "Pending" && (

        <div className="flex gap-3 mt-6">

          <button
            onClick={() =>
              updateStatus(
                request._id,
                "Approved"
              )
            }
            className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-5
            py-2
            rounded-xl
            "
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
            className="
            bg-red-600
            hover:bg-red-700
            text-white
            px-5
            py-2
            rounded-xl
            "
          >
            Reject
          </button>

        </div>

      )}

    </div>

  ))}

</div>

     
    </div>
  );
};

export default AdminWFH;