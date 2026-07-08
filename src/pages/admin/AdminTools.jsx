import React, { useState } from "react";
import api from "../../api/axios";
import {
  FaSearch,
  FaUsers,
  FaTasks,
  FaTrashAlt,
} from "react-icons/fa";

const AdminTools = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [department, setDepartment] = useState("");
  const [departmentEmployees, setDepartmentEmployees] = useState([]);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const extractEmployees = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.employees)) return data.employees;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  };

  const handleSearch = async () => {
    if (!searchName.trim()) return;

    try {
      setLoading(true);
      setError("");

      const res = await api.get(
        `/api/admin-tools/search?name=${searchName}`
      );

      setSearchResults(extractEmployees(res.data));
    } catch (err) {
      console.error(err);
      setError("Failed to search employee");
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentFilter = async () => {
    if (!department.trim()) return;

    try {
      setLoading(true);
      setError("");

      const res = await api.get(
        `/api/admin-tools/department/${department}`
      );

      setDepartmentEmployees(extractEmployees(res.data));
    } catch (err) {
      console.error(err);
      setError("Failed to fetch department employees");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await api.post(
        "/api/admin-tools/assign-all",
        taskData
      );

      alert("Task assigned successfully");

      setTaskData({
        title: "",
        description: "",
        dueDate: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to assign task");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDepartment = async () => {
    if (!department.trim()) return;

    const confirmDelete = window.confirm(
      `Delete entire ${department} department?`
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);
      setError("");

      await api.delete(
        `/api/admin-tools/department/${department}`
      );

      alert("Department deleted successfully");

      setDepartment("");
      setDepartmentEmployees([]);
    } catch (err) {
      console.error(err);
      setError("Failed to delete department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            Admin Tools
          </h1>
          <p className="text-slate-500 mt-2">
            Manage employees, departments and tasks.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Search Employee */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <FaSearch className="text-blue-600" />
              <h2 className="text-xl font-semibold">
                Search Employee
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter employee name"
                value={searchName}
                onChange={(e) =>
                  setSearchName(e.target.value)
                }
                className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
              >
                Search
              </button>
            </div>

            <div className="mt-5 space-y-3 max-h-72 overflow-y-auto">
              {searchResults.map((emp, index) => (
                <div
                  key={emp._id || index}
                  className="border rounded-xl p-3 bg-slate-50"
                >
                  <h3 className="font-semibold">
                    {emp.name || "N/A"}
                  </h3>

                  <p className="text-sm text-slate-600">
                    {emp.email || "No Email"}
                  </p>

                  <p className="text-sm text-slate-500">
                    {emp.department || "No Department"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Department Filter */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <FaUsers className="text-green-600" />
              <h2 className="text-xl font-semibold">
                Filter Department
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter department"
                value={department}
                onChange={(e) =>
                  setDepartment(e.target.value)
                }
                className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                onClick={handleDepartmentFilter}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
              >
                Filter
              </button>
            </div>

            <div className="mt-5 space-y-3 max-h-72 overflow-y-auto">
              {departmentEmployees.map((emp, index) => (
                <div
                  key={emp._id || index}
                  className="border rounded-xl p-3 bg-slate-50"
                >
                  <h3 className="font-semibold">
                    {emp.name || "N/A"}
                  </h3>

                  <p className="text-sm text-slate-600">
                    {emp.email || "No Email"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Assign Task */}
        <div className="bg-white rounded-2xl shadow-lg border p-6 mt-6">
          <div className="flex items-center gap-3 mb-5">
            <FaTasks className="text-purple-600" />
            <h2 className="text-xl font-semibold">
              Assign Task To All Employees
            </h2>
          </div>

          <form
            onSubmit={handleAssignTask}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Task Title"
              value={taskData.title}
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  title: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3"
              required
            />

            <textarea
              rows="4"
              placeholder="Task Description"
              value={taskData.description}
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  description: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3"
              required
            />

            <input
              type="date"
              value={taskData.dueDate}
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  dueDate: e.target.value,
                })
              }
              className="w-full md:w-72 border rounded-xl px-4 py-3"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl"
            >
              Assign Task
            </button>
          </form>
        </div>

        {/* Delete Department */}
        <div className="bg-white rounded-2xl shadow-lg border p-6 mt-6">
          <div className="flex items-center gap-3 mb-5">
            <FaTrashAlt className="text-red-600" />
            <h2 className="text-xl font-semibold text-red-600">
              Delete Entire Department
            </h2>
          </div>

          <p className="text-slate-500 mb-4">
            This action cannot be undone.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Department Name"
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
              className="flex-1 border rounded-xl px-4 py-3"
            />

            <button
              onClick={handleDeleteDepartment}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
            >
              Delete Department
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center mt-6 text-slate-600 font-medium">
            Processing...
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTools;