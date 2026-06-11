import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/api/employees");
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(
          `/api/employees/${editingId}`,
          formData
        );
      } else {
        await api.post(
          "/api/employees",
          formData
        );
      }

      setFormData({
        name: "",
        email: "",
        department: "",
      });

      setEditingId(null);
      setShowModal(false);

      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete employee?"
      )
    )
      return;

    try {
      await api.delete(
        `/api/employees/${id}`
      );

      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (employee) => {
    setEditingId(employee._id);

    setFormData({
      name: employee.name || "",
      email: employee.email || "",
      department:
        employee.department || "",
    });

    setShowModal(true);
  };

  const filteredEmployees =
    employees.filter((employee) =>
      `${employee.name} ${employee.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Employee Management
          </h1>

          <p className="text-gray-500">
            Manage all employees
          </p>
        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-3
          rounded-xl
          "
        >
          + Add Employee
        </button>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 rounded-2xl">
          <p>Total Employees</p>
          <h2 className="text-3xl font-bold">
            {employees.length}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-5 rounded-2xl">
          <p>IT Department</p>
          <h2 className="text-3xl font-bold">
            {
              employees.filter(
                (e) =>
                  e.department === "IT"
              ).length
            }
          </h2>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-5 rounded-2xl">
          <p>HR Department</p>
          <h2 className="text-3xl font-bold">
            {
              employees.filter(
                (e) =>
                  e.department === "HR"
              ).length
            }
          </h2>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-5 rounded-2xl">
          <p>Active</p>
          <h2 className="text-3xl font-bold">
            {employees.length}
          </h2>
        </div>

      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
        w-full
        md:w-80
        border
        p-3
        rounded-xl
        "
      />

      {/* Desktop Table */}

      <div className="hidden md:block bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">
                Name
              </th>
              <th className="p-4 text-left">
                Email
              </th>
              <th className="p-4 text-left">
                Department
              </th>
              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map(
              (employee) => (
                <tr
                  key={employee._id}
                  className="border-b"
                >
                  <td className="p-4">
                    {employee.name ||
                      "N/A"}
                  </td>

                  <td className="p-4">
                    {employee.email ||
                      "N/A"}
                  </td>

                  <td className="p-4">
                    {employee.department ||
                      "N/A"}
                  </td>

                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() =>
                        handleEdit(
                          employee
                        )
                      }
                      className="
                      bg-yellow-500
                      text-white
                      px-3
                      py-2
                      rounded
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          employee._id
                        )
                      }
                      className="
                      bg-red-500
                      text-white
                      px-3
                      py-2
                      rounded
                      "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}

      <div className="md:hidden space-y-4">
        {filteredEmployees.map(
          (employee) => (
            <div
              key={employee._id}
              className="bg-white rounded-xl p-4 shadow"
            >
              <h3 className="font-bold">
                {employee.name ||
                  "N/A"}
              </h3>

              <p>
                {employee.email ||
                  "N/A"}
              </p>

              <p>
                {
                  employee.department
                }
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() =>
                    handleEdit(
                      employee
                    )
                  }
                  className="
                  bg-yellow-500
                  text-white
                  px-3
                  py-2
                  rounded
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      employee._id
                    )
                  }
                  className="
                  bg-red-500
                  text-white
                  px-3
                  py-2
                  rounded
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {/* Modal */}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">

          <div className="bg-white rounded-2xl p-6 w-full max-w-md">

            <h2 className="text-2xl font-bold mb-4">
              {editingId
                ? "Edit Employee"
                : "Add Employee"}
            </h2>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Name"
                value={
                  formData.name
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name:
                      e.target.value,
                  })
                }
                className="w-full border p-3 rounded"
              />

              <input
                type="email"
                placeholder="Email"
                value={
                  formData.email
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email:
                      e.target.value,
                  })
                }
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                placeholder="Department"
                value={
                  formData.department
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    department:
                      e.target.value,
                  })
                }
                className="w-full border p-3 rounded"
              />

              <div className="flex gap-3">
                <button
                  className="
                  flex-1
                  bg-blue-600
                  text-white
                  py-3
                  rounded
                  "
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                  className="
                  flex-1
                  bg-gray-300
                  py-3
                  rounded
                  "
                >
                  Cancel
                </button>
              </div>
            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default Employees;