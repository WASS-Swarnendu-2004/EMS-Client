import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {approveLeave,rejectLeave} from '../../redux/slices/leaveSlice.js';

const AdminLeaves = () => {
  const dispatch = useDispatch();

  const leaves = useSelector(
    (state) => state.leave.leaves
  );

  console.log("Redux Leaves:", leaves);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved':
        return { color: 'green' };

      case 'Rejected':
        return { color: 'red' };

      case 'Pending':
        return { color: 'orange' };

      default:
        return {};
    }
  };

  console.log(leaves);

  return (
    <div>
      <h2>Leave Requests</h2>

      {leaves.length === 0 ? (
        <p>No leave requests found.</p>
      ) : (
        leaves.map((leave) => (
          <div key={leave.id}>
            <p>Reason: {leave.reason}</p>
            <p>From: {leave.fromDate}</p>
            <p>To: {leave.toDate}</p>

            <p style={getStatusStyle(leave.status)}>
              Status: {leave.status}
            </p>

            {leave.status === 'Pending' && (
              <>
                <button
                  onClick={() =>
                    dispatch(approveLeave(leave.id))
                  }
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    dispatch(rejectLeave(leave.id))
                  }
                >
                  Reject
                </button>
              </>
            )}

            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default AdminLeaves;