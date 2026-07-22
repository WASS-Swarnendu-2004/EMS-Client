import React, { useState } from "react";
import { toast } from "react-toastify";

const DailyWorkLog = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Frontend",
    priority: "Medium",
  })
  const [tasks, setTasks] = useState([]);

 
  const handleAddTask = () => {
    if (formData.title.trim() === "" || formData.description.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      priority: formData.priority,
      status: "Pending",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setTasks([...tasks, newTask]);
    setFormData({
      title: "",
      description: "",
      category: "Frontend",
      priority: "Medium",
    })
  };

  
  const toggleTask = (id) => {
    const updated = tasks.map((task) =>
      task.id === id
        ? {
          ...task, 
          status:
            task.status === "Completed" ? "Pending" : "Completed",
        }
        : task
    );

    setTasks(updated);
  };

  
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-4 flex flex-col items-center">

      
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
           Daily Work Log 
        </h1>
        
      </div>

      
      <div className="w-full max-w-xl flex flex-col gap-2 mb-6">
        <input
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="text"
          placeholder="Enter today's task..."
          value={formData.title}
          onChange={(e) => setFormData({
            ...formData,
            title: e.target.value,
          })}
        />
        <textarea
          rows={4}
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter work description..."
          value={formData.description}
          onChange={(e) => setFormData({
            ...formData,
            description:e.target.value,
          })}
        />
        <select
          className="p-3 rounded-lg border border-gray focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value,
            })
          }
        >
          <option value="Design">Design</option> 
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>  
          <option value="Testing">Testing</option> 
          <option value="Bug Fix">Bug Fix</option> 
          <option value="Meeting">Meeting</option> 
          <option value="Research">Research</option> 
        </select>


        <select
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={formData.priority}
          onChange={(e) =>
            setFormData({
              ...formData,
              priority: e.target.value,
            })
          }
        >
         <option value="High">High</option>
         <option value="Medium">Medium</option>
         <option value="Low">Low</option>
        </select>

        <button
          onClick={handleAddTask}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg transition"
        >
          Add
        </button>
      </div>

      
      <div className="flex gap-4 mb-6 flex-wrap justify-center">
        <div className="bg-white shadow px-4 py-2 rounded-lg">
          Total: {tasks.length}
        </div>
        <div className="bg-white shadow px-4 py-2 rounded-lg">
          Completed: {tasks.filter(t => t.status === "Completed").length}
        </div>
        <div className="bg-white shadow px-4 py-2 rounded-lg">
          Pending: {tasks.filter(t => t.status === "Pending").length}
        </div>
      </div>

     
      <div className="w-full max-w-xl space-y-3">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">
            No tasks added yet 
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between bg-white shadow rounded-xl p-4 transition ${
                task.status === "Completed" ? "opacity-60" : ""
              }`}
            >
              <div className="flex justify-between items start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.status === "Completed"}
                      onChange={() => toggleTask(task.id)}
                      className="w-4 h-4"
                    />
                      
                    <h3
                      className={`text-lg font-semibold ${
                        task.status === "Completed"
                        ? "line-through text-gray-400"
                        :""
                      }`}
                    >
                     {task.title} 
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {task.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                        {task.category}
                      </span>

                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                        {task.priority}
                      </span>

                      <span
                        className={`px-2 py-1 rounded ${
                          task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}>
                          {task.status}
                      </span>
                      <p className="text-sm text-gray-500">
                        {task.date} • {task.time}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DailyWorkLog;