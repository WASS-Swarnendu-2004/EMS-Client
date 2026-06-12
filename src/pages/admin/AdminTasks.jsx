import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminTasks = () => {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
  });

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
      await api.post("/api/tasks", formData);

      alert("Task Created Successfully");

      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        dueDate: "",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("Failed To Create Task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`);

      alert("Task Deleted");

      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("Failed To Delete Task");
    }
  };

  return (
    <div className="space-y-8">

      {/* Create Task */}

      <div>
        <h1 className="text-3xl font-bold mb-6">
          Create Task
        </h1>

        <div className="bg-white rounded-xl shadow p-6">

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
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

            <select
              value={formData.assignedTo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  assignedTo: e.target.value,
                })
              }
              className="w-full border p-3 rounded-lg"
              required
            >
              <option value="">
                Select Employee
              </option>

              {employees.map((employee) => (
                <option
                  key={employee._id}
                  value={employee.userId?._id}
                >
                  {employee.userId?.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={formData.dueDate}
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
              className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-lg
              "
            >
              Create Task
            </button>
          </form>

        </div>
      </div>

      {/* All Tasks */}

      <div>
        <h2 className="text-3xl font-bold mb-6">
          All Tasks
        </h2>

        {tasks.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            No Tasks Found
          </div>
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
                <h3 className="text-xl font-bold">
                  {task.title}
                </h3>

                <p className="text-gray-600 mt-2">
                  {task.description}
                </p>

                <div className="mt-4 space-y-1">

                  <p>
                    <strong>Employee:</strong>{" "}
                    {task.assignedTo?.name ||
                      "Not Assigned"}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        task.status ===
                        "Completed"
                          ? "text-green-600 font-semibold"
                          : "text-orange-500 font-semibold"
                      }
                    >
                      {task.status}
                    </span>
                  </p>

                  <p>
                    <strong>Due Date:</strong>{" "}
                    {new Date(
                      task.dueDate
                    ).toLocaleDateString()}
                  </p>

                </div>

                <button
                  onClick={() =>
                    handleDelete(task._id)
                  }
                  className="
                  mt-4
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  "
                >
                  Delete Task
                </button>

              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  );
};

export default AdminTasks;