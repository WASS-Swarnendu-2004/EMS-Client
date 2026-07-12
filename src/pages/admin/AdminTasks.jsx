import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/axios";

const AdminTasks = () => {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [assignmentType, setAssignmentType] = useState("single");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: [],
    dueDate: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/api/employees");
      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get("/api/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let payload = {
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
      };

      // Single Employee
      if (assignmentType === "single") {
        if (formData.assignedTo.length === 0) {
          toast.warning("Please select an employee");
          return;
        }

        payload.assignedTo = formData.assignedTo[0];
      }

      // Multiple Employees
      else if (assignmentType === "multiple") {
        if (formData.assignedTo.length === 0) {
          toast.warning("Please select at least one employee");
          return;
        }

        payload.assignedTo = formData.assignedTo;
      }

      // All Employees
      else if (assignmentType === "all") {
        payload.assignAll = true;
      }

      console.log("Payload:", payload);

      const res = await api.post("/api/tasks", payload);

      toast.success(res.data.message);

      setFormData({
        title: "",
        description: "",
        assignedTo: [],
        dueDate: "",
      });

      setAssignmentType("single");

      fetchTasks();
    } catch (error) {
      console.log(error);
      toast.error("Failed To Create Task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`);

      toast.success("Task Deleted");

      fetchTasks();
    } catch (error) {
      console.log(error);
      toast.error("Failed To Delete Task");
    }
  };

  const handleEdit = (task) => {
    setIsEditing(true);
    setEditingTaskId(task._id);

    setFormData({
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo ? [task.assignedTo._id] : [],
      dueDate: task.dueDate.split("T")[0],
    });
  };

  return (
    <div className="space-y-8">
      {/* Create Task */}

      <div>
        <h1 className="text-3xl font-bold mb-6">Create Task</h1>

        <div className="bg-white rounded-xl shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Task Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              className="w-full border p-3 rounded-lg"
              required
            />

            <textarea
              placeholder="Task Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="w-full border p-3 rounded-lg"
              rows="4"
              required
            />
            <div className="space-y-3">
              <label className="font-semibold text-gray-700">
                Assign Task To
              </label>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="single"
                    checked={assignmentType === "single"}
                    onChange={(e) => setAssignmentType(e.target.value)}
                  />
                  Single Employee
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="multiple"
                    checked={assignmentType === "multiple"}
                    onChange={(e) => setAssignmentType(e.target.value)}
                  />
                  Multiple Employees
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="all"
                    checked={assignmentType === "all"}
                    onChange={(e) => setAssignmentType(e.target.value)}
                  />
                  All Employees
                </label>
              </div>
            </div>

            {assignmentType === "single" && (
              <select
                value={formData.assignedTo[0] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    assignedTo: [e.target.value],
                  })
                }
                className="w-full border p-3 rounded-lg"
                required
              >
                <option value="">Select Employee</option>

                {employees.map((employee) => (
                  <option key={employee._id} value={employee.userId?._id}>
                    {employee.userId?.name}
                  </option>
                ))}
              </select>
            )}
            {assignmentType === "multiple" && (
              <div className="border rounded-lg p-4 max-h-56 overflow-y-auto">
                <p className="font-semibold mb-3">Select Employees</p>

                {employees.map((employee) => {
                  const employeeId = employee.userId?._id;

                  return (
                    <label
                      key={employee._id}
                      className="flex items-center gap-3 mb-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.assignedTo.includes(employeeId)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              assignedTo: [...formData.assignedTo, employeeId],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              assignedTo: formData.assignedTo.filter(
                                (id) => id !== employeeId,
                              ),
                            });
                          }
                        }}
                      />

                      {employee.userId?.name}
                    </label>
                  );
                })}
              </div>
            )}
            {assignmentType === "all" && (
              <div
                className="
      bg-green-50
      border
      border-green-300
      text-green-700
      rounded-lg
      p-4
    "
              >
                ✅ This task will be assigned to all employees.
                <br />
                No employee selection is required.
              </div>
            )}
            <input
              type="date"
              value={formData.dueDate}
              min={today}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dueDate: e.target.value,
                })
              }
              className="w-full border p-3 rounded-lg"
              required
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              {isEditing ? "Update Task" : "Create Task"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditingTaskId(null);

                  setFormData({
                    title: "",
                    description: "",
                    assignedTo: [],
                    dueDate: "",
                  });
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg ml-3"
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      {/* All Tasks */}

      <div>
        <h2 className="text-3xl font-bold mb-6">All Tasks</h2>

        {tasks.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">No Tasks Found</div>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="
                bg-white
                p-5
                rounded-xl
                shadow
                border
                "
              >
                <h3 className="text-xl font-bold">{task.title}</h3>

                <p className="text-gray-600 mt-2">{task.description}</p>

                <div className="mt-4 space-y-1">
                  <p>
                    <strong>Employee:</strong>{" "}
                    {task.assignedTo?.name || "Not Assigned"}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        task.status === "Completed"
                          ? "text-green-600 font-semibold"
                          : "text-orange-500 font-semibold"
                      }
                    >
                      {task.status}
                    </span>
                  </p>

                  <p>
                    <strong>Due Date:</strong>{" "}
                    {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTasks;
