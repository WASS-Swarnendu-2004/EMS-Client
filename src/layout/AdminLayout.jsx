import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      
      <div
        className={`
        fixed md:static top-0 left-0 h-screen w-64
        bg-gradient-to-b from-slate-900 to-slate-800
        text-white p-5 flex flex-col shadow-xl z-50
        transform transition-transform duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
      `}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Admin Panel
          </h2>

          <button
            className="md:hidden"
            onClick={closeSidebar}
          >
            <FaTimes size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          <NavLink
            to="dashboard"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `px-3 py-2 rounded transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-700"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="tasks"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `px-3 py-2 rounded transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-700"
              }`
            }
          >
            Tasks
          </NavLink>

          <NavLink
            to="employees"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `px-3 py-2 rounded transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-700"
              }`
            }
          >
            Employees
          </NavLink>

          <NavLink
            to="leaves"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `px-3 py-2 rounded transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-700"
              }`
            }
          >
            Leaves
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

     
      <div className="flex-1">
        
        <div className="md:hidden bg-white shadow px-4 py-4 flex items-center">
          <button
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            <FaBars size={24} />
          </button>

          <h1 className="ml-4 font-bold text-lg">
            Admin Panel
          </h1>
        </div>

        <div className="p-4 md:p-8">
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 min-h-[calc(100vh-100px)]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;