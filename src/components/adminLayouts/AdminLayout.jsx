import React from "react";
import classes from "./adminLayout.module.css";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRoles, isLoggedIn } from "../../features/auth/authSlice";

const AdminLayout = () => {
  const loggedIn = useSelector(isLoggedIn);
  const roles = useSelector(getRoles);
  const location = useLocation();

  return (
    <>
      <AdminNavbar />
      <div className={classes.dashboard}>
        <AdminSidebar />
        {loggedIn ? (
          roles.includes("ROLE_ADMIN") ? (
            <div className={classes.content}>
              <Outlet />
            </div>
          ) : (
            <Navigate to="/" state={{ from: location }} replace={true} />
          )
        ) : (
          <Navigate to="/login" state={{ from: location }} replace={true} />
        )}
      </div>
    </>
  );
};

export default AdminLayout;
