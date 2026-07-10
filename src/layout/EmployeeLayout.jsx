import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const EmployeeLayout = () => {
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
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <div
        className={`
        fixed md:sticky top-0 left-0 h-screen w-64
        bg-gradient-to-b from-slate-500 to-slate-700
        text-white p-5 flex flex-col z-50
        transform transition-transform duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
      `}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Employee Panel
          </h2>

          <button
            className="md:hidden"
            onClick={closeSidebar}
          >
            <FaTimes size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          <NavLink to="dashboard" onClick={closeSidebar} className={({isActive}) => `px-3 py-2 rounded ${isActive ? "bg-blue-600" : "hover:bg-slate-700"}`}>
            Dashboard
          </NavLink>

          <NavLink to="mytasks" onClick={closeSidebar} className={({isActive}) => `px-3 py-2 rounded ${isActive ? "bg-blue-600" : "hover:bg-slate-700"}`}>
            My Tasks
          </NavLink>

          {/* <NavLink to="dailyworklog"onClick={closeSidebar}className={({ isActive }) =>`px-3 py-2 rounded ${isActive? "bg-blue-600": "hover:bg-slate-700"}`}>
            Daily Work Log
          </NavLink> */}

          <NavLink to="applyleave" onClick={closeSidebar} className={({isActive}) => `px-3 py-2 rounded ${isActive ? "bg-blue-600" : "hover:bg-slate-700"}`}>
            Apply Leave
          </NavLink>

          <NavLink to="leavehistory" onClick={closeSidebar} className={({isActive}) => `px-3 py-2 rounded ${isActive ? "bg-blue-600" : "hover:bg-slate-700"}`}>
            Leave History
          </NavLink>

          <NavLink to="applywfh" onClick={closeSidebar}className={({isActive}) =>
          `px-3 py-2 rounded ${isActive? "bg-blue-600": "hover:bg-slate-700"}`}>
             Apply WFH
          </NavLink>

          <NavLink to="wfhhistory" onClick={closeSidebar}className={({isActive}) =>
          `px-3 py-2 rounded ${isActive? "bg-blue-600": "hover:bg-slate-700"}`}>
            WFH History
        </NavLink>

          <NavLink to="profile" onClick={closeSidebar} className={({isActive}) => `px-3 py-2 rounded ${isActive ? "bg-blue-600" : "hover:bg-slate-700"}`}>
            Profile
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 py-2 rounded-lg"
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
            Employee Panel
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

export default EmployeeLayout;