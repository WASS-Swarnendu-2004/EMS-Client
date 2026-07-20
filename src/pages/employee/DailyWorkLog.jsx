import React, { useState } from "react";

const DailyWorkLog = () => {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);

 
  const handleAddTask = () => {
    if (taskInput.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  
  const toggleTask = (id) => {
    const updated = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
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

      
      <div className="w-full max-w-xl flex gap-2 mb-6">
        <input
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="text"
          placeholder="Enter today's task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />

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
          Completed: {tasks.filter(t => t.completed).length}
        </div>
        <div className="bg-white shadow px-4 py-2 rounded-lg">
          Pending: {tasks.filter(t => !t.completed).length}
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
                task.completed ? "opacity-60" : ""
              }`}
            >
              

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4"
                />

                <span
                  className={`text-gray-800 ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.text}
                </span>
              </div>

              
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 text-lg"
              >
                Delete task
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DailyWorkLog;