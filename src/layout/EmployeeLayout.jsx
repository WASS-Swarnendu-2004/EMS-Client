import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const EmployeeLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      
      
      <div className="w-64 bg-slate-800 text-white p-5 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">
          Employee Panel
        </h2>

        <nav className="flex flex-col gap-3">
          <NavLink
            to="dashboard"
            className={({ isActive }) => 
              `px-3 py-2 rounded ${
              isActive
                ? "bg-blue-600 text-white"
                :"hover:bg-slate-700"
            }`}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="mytasks"
            className={({ isActive }) => 
              `px-3 py-2 rounded ${
              isActive
                ? "bg-blue-600 text-white"
                :"hover:bg-slate-700"
            }`}
          >
            My Tasks
          </NavLink>

          <NavLink
            to="applyleave"
            className={({ isActive }) => 
              `px-3 py-2 rounded ${
              isActive
                ? "bg-blue-600 text-white"
                :"hover:bg-slate-700"
            }`}
          >
            Apply Leave
          </NavLink>

          <NavLink
            to="leavehistory"
            className={({ isActive }) => 
              `px-3 py-2 rounded ${
              isActive
                ? "bg-blue-600 text-white"
                :"hover:bg-slate-700"
            }`}
          >
            Leave History
          </NavLink>

          <NavLink
            to="profile"
            className={({ isActive }) => 
              `px-3 py-2 rounded ${
              isActive
                ? "bg-blue-600 text-white"
                :"hover:bg-slate-700"
            }`}
          >
            Profile
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      
      <div className="flex-1 bg-slate-100 p-8 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-md p-6 min-h-full">
         <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeeLayout;