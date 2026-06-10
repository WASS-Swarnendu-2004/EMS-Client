import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {approveLeave,rejectLeave} from '../../redux/slices/leaveSlice.js';

const AdminLeaves = () => {
  const dispatch = useDispatch();

  const leaves = useSelector(
    (state) => state.leave.leaves
  );

return (
  <div>
    <h1 className="text-3xl font-bold mb-6">
      Leave Requests
    </h1>

    {leaves.length === 0 ? (
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500">
          No leave requests found.
        </p>
      </div>
    ) : (
      <div className="space-y-4">
        {leaves.map((leave) => (
          <div
            key={leave.id}
            className="bg-white rounded-xl shadow p-5"
          >
            <h3 className="text-lg font-semibold mb-3">
              {leave.reason}
            </h3>

            <p className="mb-2">
              <strong>From:</strong> {leave.fromDate}
            </p>

            <p className="mb-2">
              <strong>To:</strong> {leave.toDate}
            </p>

            <p className="mb-4">
              <strong>Status:</strong>

              <span
                className={`ml-2 font-semibold ${
                  leave.status === "Approved"
                    ? "text-green-600"
                    : leave.status === "Rejected"
                    ? "text-red-600"
                    : "text-orange-500"
                }`}
              >
                {leave.status}
              </span>
            </p>

            {leave.status === "Pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    dispatch(approveLeave(leave.id))
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    dispatch(rejectLeave(leave.id))
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default AdminLeaves;