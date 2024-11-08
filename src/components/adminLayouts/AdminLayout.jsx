import React from 'react'
import classes from './adminLayout.module.css'
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';



const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <div className={classes.dashboard}>
        <AdminSidebar />
        <div className={classes.content}>
        <Outlet/>
        </div>

      </div>
    </>
);
  
}

export default AdminLayout
