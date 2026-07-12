import React, { useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

const ApplyLeave = () => {
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reason.trim()) {
      toast.warning("Please enter a leave reason.");
      return;
    }

    if (!fromDate || !toDate) {
      toast.warning("Please select both From Date and To Date.");
      return;
    }

    if (toDate < fromDate) {
      toast.warning("To Date cannot be earlier than From Date..");
      return;
    }
    try {
      const res = await api.post("/api/leaves", {
        reason,
        fromDate,
        toDate,
      });
      toast.success(
        res.data.message || "Leave request submitted successfully.",
      );
      setReason("");
      setFromDate("");
      setToDate("");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to submit leave request.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Apply for Leave</h1>
          <p className="text-gray-500">Submit your leave request to HR</p>
        </div>

        {/* Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Enter leave reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={fromDate}
                min={today}
                onChange={(e) => setFromDate(e.target.value)}
                className="p-3 border rounded-xl"
              />

              <input
                type="date"
                value={toDate}
                min={today}
                onChange={(e) => setToDate(e.target.value)}
                className="p-3 border rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeave;
