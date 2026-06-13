import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const WFHHistory = () => {
  const [wfhHistory, setWfhHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWFHHistory = async () => {
    try {
      const res = await api.get("/api/wfh/my");

      setWfhHistory(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWFHHistory();
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

  return (
    <div className="space-y-6">
    

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          WFH History
        </h1>

        <p className="text-gray-500">
          View all your Work From Home requests
        </p>
      </div>


      {loading ? (
        <div className="bg-white rounded-2xl p-8 text-center shadow">
          <p className="text-gray-500">
            Loading WFH Requests...
          </p>
        </div>
      ) : wfhHistory.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center shadow">
          <p className="text-gray-500">
            No WFH Requests Found
          </p>
        </div>
      ) : (
        <>
          

          <div className="hidden md:block bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
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
                    Applied On
                  </th>
                </tr>
              </thead>

              <tbody>
                {wfhHistory.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b"
                  >
                    <td className="p-4">
                      {item.startDate
                        ? new Date(
                            item.startDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="p-4">
                      {item.endDate
                        ? new Date(
                            item.endDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="p-4">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          

          <div className="md:hidden space-y-4">
            {wfhHistory.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">
                    WFH Request
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <p>
                    <strong>
                      Applied On:
                    </strong>{" "}
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WFHHistory;