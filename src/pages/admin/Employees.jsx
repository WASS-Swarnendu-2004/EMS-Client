import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editingEmplyoeeId, setEditingEmployeeId] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [departments, setDepartments] = useState([]);

  
  const fetchEmployees = async (department = "") => {
    try {
      // const res = await api.get("/api/employees");
      const url = department ?
        `/api/employees?search=${department}`
        : "/api/employees"
      console.log(url);
      
      const res = await api.get(url);
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/api/employees/departments");
      setDepartments(res.data)
    } catch (error) {
      console.log(error);
      
    }
  }

  // useEffect(() => {
  //   fetchEmployees();
  //   fetchDepartments();
  // }, []);

  useEffect(() => {
    fetchDepartments();
  }, [])

  useEffect(() => {
    fetchEmployees(selectedDepartment);
  }, [selectedDepartment])

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (isEditing) {
        const payload = {
          name: formData.name,
          department: formData.department,
        }
        const res = await api.put(
          `/api/employees/${editingEmplyoeeId}`,payload
        )
        toast.success(
          res.data.message || "Employee updated successfully."
        )
      } else {
        const res = await api.post("/api/employees", formData);
        toast.success(res.data.message || "Employee created successfully");
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        department: "",
      });

      setShowModal(false)
      setIsEditing(false)
      setEditingEmployeeId(null)
      fetchEmployees(selectedDepartment);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || (isEditing 
        ? "Failed to update employee"
        : "Failed to create employee")
      );
    }
  };

  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/employees/${id}`);

      
      // setEmployees((prev) =>
      //   prev.filter((emp) => emp._id !== id)
      // );

      toast.success("Employee deleted successfully");
      fetchEmployees(selectedDepartment)
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.message || "Failed to delete employee"
      );
    }
  };

  const handleEdit = (employee) => {
    setIsEditing(true)
    setEditingEmployeeId(employee._id)

    setFormData({
      name: employee.userId?.name || "",
      email: employee.userId?.email || "",
      password: "",
      department: employee.department || "",
    })

    setShowModal(true)
  }

  
  const filteredEmployees = employees.filter((employee) =>
    `${employee.userId?.name || ""} ${employee.userId?.email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Employee Management
          </h1>
          <p className="text-gray-500">Manage all employees</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
        >
          {isEditing ? "Edit Employee" : "Add Employee"}
        </button>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 rounded-2xl">
          <p>Total Employees</p>
          <h2 className="text-3xl font-bold">{employees.length}</h2>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-5 rounded-2xl">
          <p>Active Employees</p>
          <h2 className="text-3xl font-bold">{employees.length}</h2>
        </div>
      </div>

      {/* <input
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-80 border p-3 rounded-xl"
      /> */}

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Seacrh Employee"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 border p-3 rounded-xl"
        />

        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="w-full md:w-60 border p-3 rounded-xl"
        >
          <option value="">All Departments</option>

          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}

        </select>

      </div>

    
      <div className="hidden md:block bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id} className="border-b">
                <td className="p-4">{employee.userId?.name || "N/A"}</td>
                <td className="p-4">{employee.userId?.email || "N/A"}</td>
                <td className="p-4">{employee.userId?.role || "N/A"}</td>
                <td className="p-4">{employee.department || "N/A"}</td>

                
                <td className="p-4">
                  <div className="flex gap-3">
                   <button
                     onClick={() => handleEdit(employee)}
                     className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                   >
                     Edit
                   </button>
                  <button
                     onClick={() => handleDelete(employee._id)}
                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                   >
                     Delete
                    </button>
                 </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
      <div className="md:hidden space-y-4">
        {filteredEmployees.map((employee) => (
          <div key={employee._id} className="bg-white rounded-xl p-4 shadow">
            <h3 className="font-bold text-lg">
              {employee.userId?.name || "N/A"}
            </h3>

            <p>{employee.userId?.email || "N/A"}</p>
            <p>Role: {employee.userId?.role}</p>
            <p>Department: {employee.department}</p>

             <button
              onClick={() => handleEdit(employee)}
              className="mt-3 bg-yellow-500 text-white px-3 py-1 rounded-lg"
            >
              Edit
            </button>
            
            <button
              onClick={() => handleDelete(employee._id)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add Employee</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border p-3 rounded"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                readOnly={isEditing}
                className={`w-full border p-3     rounded ${isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                required
              />

              <input
                type="password"
                placeholder={
                  isEditing
                    ? "Password cannot be changed"
                    : "Password"
                }
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`w-full border p-3 rounded ${isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                disabled={isEditing}
                required={!isEditing}
              />

              <select
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="w-full border p-3 rounded"
                required
              >
                <option value="">Select Department</option>{departments.map((dept) => (<option key={dept} value={dept}>{dept} </option>
              ))}
              </select>

              {/* <input
                type="text"
                placeholder="Enter Department"
                value={formData.Department}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    Department: e.target.value.trim(),
                  })}
                className="w-full border p-3 rounded"
                  required
                /> */}
              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 text-white py-3 rounded">
                  {isEditing ? "Update" : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setIsEditing(false)
                    setEditingEmployeeId(null)
                    setFormData({
                      name: "",
                      email: "",
                      password: "",
                      department: "",
                    });
                  } 
                  }
                  className="flex-1 bg-gray-300 py-3 rounded"
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