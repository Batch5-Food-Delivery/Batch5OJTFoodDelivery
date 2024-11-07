import React from 'react'
import { FaPlusCircle, FaUtensils } from 'react-icons/fa'
import classes from './adminSidebar.module.css'
import { Link } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <div className={classes.sidebar}>
    <ul>
    <li>
          <FaUtensils size={20} />{' '}
          <Link to="/admin/foods">Manage Foods</Link>
        </li>
        <li>
          <FaPlusCircle size={20} />{' '}
          <Link to="/admin/create">Create Food</Link>
        </li>
    </ul>
  </div>
  )
}

export default AdminSidebar