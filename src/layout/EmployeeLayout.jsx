import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaTasks, FaCalendarAlt, FaUser, FaSignOutAlt } from "react-icons/fa";

const EmployeeLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true)

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
        fixed md:sticky top-0 left-0 h-screen 
        transition-all duration-300
        ${desktopSidebarOpen ? "md:w-64" : "md:w-20"}
        w-64
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
          <button
            onClick={() => 
              setDesktopSidebarOpen(!desktopSidebarOpen)
            }
            className="hidden md:block"
          >
            <FaBars size={20} />
          </button>
          {desktopSidebarOpen && (
            <h2 className="text-2xl font-bold">
              Employee Panel
            </h2>
          )}

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
              `flex items-center gap-3 px-3 py-2 rounded transition ${isActive
                ? "bg-blue-600"
                : "hover:bg-slate-700"}`}>
            <FaHome className="text-lg min-w-[20px]" />
            {desktopSidebarOpen && <span>Dashboard</span>}
          </NavLink>

          <NavLink
            to="mytasks"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded transition ${isActive
                ? "bg-blue-600"
                : "hover:bg-slate-700"}`}>
            <FaTasks className="text-lg min-w-[20px]" />
            {desktopSidebarOpen && <span>My Tasks</span>}
          </NavLink>

          <NavLink
            to="dailyworklog"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded transition ${isActive
                ? "bg-blue-600"
                : "hover:bg-slate-700"}`}>
            <FaTasks className="text-lg min-w-[20px]" />
            {desktopSidebarOpen && <span>Daily Work Log</span>}
          </NavLink>

          <NavLink
            to="applyleave"
            onClick={closeSidebar} className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded transition ${isActive
                ? "bg-blue-600"
                : "hover:bg-slate-700"}`}>
            <FaCalendarAlt className="text-lg min-w-[20px]" />
            {desktopSidebarOpen && <span>Apply Leave</span>}
          </NavLink>

          <NavLink
            to="leavehistory"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded transition ${isActive ? "bg-blue-600" : "hover:bg-slate-700"}`}>
            <FaCalendarAlt className="text-lg min-w-[20px]" />
            {desktopSidebarOpen && <span>Leave History</span>}
          </NavLink>

          <NavLink
            to="applywfh"
            onClick={closeSidebar}
            className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded transition
            ${isActive ?
                "bg-blue-600" : "hover:bg-slate-700"}`}>
            <FaCalendarAlt className="text-lg min-w-[20px]" />
            {desktopSidebarOpen && <span>Apply WFH</span>}
          </NavLink>

          <NavLink
            to="wfhhistory"
            onClick={closeSidebar} className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded transition
            ${isActive
                ? "bg-blue-600"
                : "hover:bg-slate-700"}`}>
            <FaCalendarAlt className="text-lg min-w-[20px]" />
            {desktopSidebarOpen && <span>WFH History</span>}
        </NavLink>

          <NavLink
            to="profile"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded transition ${isActive
                ? "bg-blue-600"
                : "hover:bg-slate-700"}`}>
            <FaUser className="text-lg min-w-[20px]" />
            {desktopSidebarOpen && <span>Profile</span>}
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center justify-center md:justify-start gap-3 bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg transition"
        >
          <FaSignOutAlt className="text-lg min-w-[20px]" />
          {desktopSidebarOpen && <span>Logout</span>}
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