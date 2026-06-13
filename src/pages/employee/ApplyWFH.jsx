import React, { useState } from "react";
import api from "../../api/axios";

const ApplyWFH = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post(
        "/api/wfh/apply",
        formData
      );

      alert("WFH Request Submitted Successfully");

      console.log(res.data);

      setFormData({
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Failed to apply for WFH"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Apply Work From Home
        </h1>

        <p className="text-gray-500 mt-2">
          Submit your Work From Home request
        </p>
      </div>

      

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
         

          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Start Date
            </label>

            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  startDate: e.target.value,
                })
              }
              required
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                p-3
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          

          <div>
            <label className="block mb-2 font-medium text-slate-700">
              End Date
            </label>

            <input
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  endDate: e.target.value,
                })
              }
              required
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                p-3
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>


          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            {loading
              ? "Submitting..."
              : "Apply For WFH"}
          </button>
        </form>
      </div>

     

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5">
        <h3 className="font-semibold text-blue-800">
          Note
        </h3>

        <ul className="mt-2 text-sm text-blue-700 list-disc ml-5">
          <li>
            Select your WFH start date.
          </li>

          <li>
            Select your WFH end date.
          </li>

          <li>
            Admin approval is required.
          </li>

          <li>
            Track request status from WFH
            History page.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ApplyWFH;