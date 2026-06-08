import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      
      <div
        style={{
          width: "200px",
          padding: "20px",
          background: "#ddd",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >
        <h3>Admin Panel</h3>

        <NavLink to="dashboard">Dashboard</NavLink>
        <NavLink to="tasks">Tasks</NavLink>
        <NavLink to="leaves">Leaves</NavLink>
      </div>

      
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;