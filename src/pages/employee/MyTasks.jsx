import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { completeTask } from '../../redux/slices/taskSlice';

const MyTasks = () => {

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks)

  
   return (
  <div>
    <h1 className="text-3xl font-bold mb-6">
      My Tasks
    </h1>

    {tasks.length === 0 ? (
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500">
          No tasks found.
        </p>
      </div>
    ) : (
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-xl shadow p-5"
          >
            <h3 className="text-lg font-semibold mb-2">
              {task.title}
            </h3>

            <p className="mb-4">
              Status:
              <span
                className={`ml-2 font-semibold ${
                  task.status === "Completed"
                    ? "text-green-600"
                    : "text-orange-500"
                }`}
              >
                {task.status}
              </span>
            </p>

            {task.status === "Pending" && (
              <button
                onClick={() =>
                  dispatch(completeTask(task.id))
                }
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Mark as Completed
              </button>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default MyTasks