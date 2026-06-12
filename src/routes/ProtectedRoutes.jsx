import React from "react";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

const ProtectedRoutes = () => {
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    return <Navigate to="/login" />;
  }

  const role =
    user.role?.toLowerCase();

  if (
    location.pathname.startsWith("/admin") &&
    role !== "admin"
  ) {
    return (
      <Navigate to="/employee/dashboard" />
    );
  }

  if (
    location.pathname.startsWith(
      "/employee"
    ) &&
    role !== "employee"
  ) {
    return (
      <Navigate to="/admin/dashboard" />
    );
  }

  return <Outlet />;
};

export default ProtectedRoutes;