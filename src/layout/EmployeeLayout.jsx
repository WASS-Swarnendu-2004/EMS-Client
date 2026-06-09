import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const EmployeeLayout = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login")
  }
  return (
    <div style={{ display: "flex" , height: "100vh"}}>
      
      
      <div style={{ width: "200px", padding: "20px", background: "#ddd", display: "flex", flexDirection:"column",gap:"10px" }}>
        <h3>Employee Panel</h3>
        <NavLink to="dashboard" >Dashboard</NavLink>
        <NavLink to="mytasks">My tasks</NavLink>
        <NavLink to="applyleave">Apply Leave</NavLink>
        <NavLink to="leavehistory">Leave History</NavLink>
        <NavLink to="profile">Profile</NavLink>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

      
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>

    </div>
  );
};

export default EmployeeLayout;