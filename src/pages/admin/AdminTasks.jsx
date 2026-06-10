import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../../redux/slices/taskSlice'

const AdminTasks = () => {
  const [title, setTitle] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
    alert("Task title is required");
    return;
  }


    const newTask = {
      id: Date.now(),
      title,
      status:"Pending"
    }
    dispatch(addTask(newTask))

    setTitle("")
  }
 return (
  <div>
    <h1 className="text-3xl font-bold mb-6">
      Create Task
    </h1>

    <div className="bg-white rounded-xl shadow p-6 max-w-lg">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Enter Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Create Task
        </button>
      </form>
    </div>
  </div>
);
}

export default AdminTasks