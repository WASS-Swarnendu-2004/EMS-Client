import React, {
  useEffect,
  useState,
} from "react";
import api from "../../api/axios";

const MyTasks = () => {
  const [tasks, setTasks] =
    useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get(
        "/api/tasks/mytasks"
      );

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    taskId
  ) => {
    try {
      await api.put(
        `/api/tasks/status/${taskId}`,
        {
          status: "Completed",
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
      alert(
        "Failed to Update Status"
      );
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        My Tasks
      </h1>

      {tasks.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow">
          No Tasks Assigned
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-xl shadow p-5"
            >
              <h3 className="text-xl font-bold">
                {task.title}
              </h3>

              <p className="text-gray-600 mt-2">
                {task.description}
              </p>

              <p className="mt-3">
                Due Date:
                {" "}
                {new Date(
                  task.dueDate
                ).toLocaleDateString()}
              </p>

              <p className="mt-3">
                Status:
                <span
                  className={`ml-2 font-semibold ${
                    task.status ===
                    "Completed"
                      ? "text-green-600"
                      : "text-orange-500"
                  }`}
                >
                  {task.status}
                </span>
              </p>

              {task.status !==
                "Completed" && (
                <button
                  onClick={() =>
                    updateStatus(
                      task._id
                    )
                  }
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Mark Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTasks;