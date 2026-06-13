import React, { useState } from "react";
import api from "../../api/axios";

const ApplyLeave = () => {
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/api/leaves", {
      reason,
      fromDate,
      toDate,
    });

    setReason("");
    setFromDate("");
    setToDate("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Apply for Leave
          </h1>
          <p className="text-gray-500">
            Submit your leave request to HR
          </p>
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
                onChange={(e) => setFromDate(e.target.value)}
                className="p-3 border rounded-xl"
              />

              <input
                type="date"
                value={toDate}
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