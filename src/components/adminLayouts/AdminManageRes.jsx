import { useDispatch, useSelector } from "react-redux";

import { Button, Container, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import classes from './adminManageRes.module.css'
import { fetchAllRestaurant, getAllRestaurant,getError, getStatus } from "../../features/restaurant/restaurantSlice";


const AdminManageRes = () => {
  const restaurants = useSelector(getAllRestaurant);
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  


  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllRestaurant());
    }
  }, [status, dispatch]);

  let content = "";

  if (status === 'loading') {
    content = <tr><td colSpan="4">Loading...</td></tr>;
  }

  if (status === "success") {
    content = restaurants?.map((restaurant) => (
      <tr key={restaurant.id} className={classes.tableRow}>
        <td>{restaurant.id}</td>
        <td><img src={restaurant.picture} alt={restaurant.name} className={classes.menuImg}/></td>
        <td>{restaurant.name}</td>
        <td>
      {/* Button */}
        
        </td>
        </tr>
    ));
  }

  if (status === "failed") {
    content = <tr><td colSpan="4">{error}</td></tr>;
  }

 

  return (
    <Container className="my-4">
      <div>
      <h2 className="mb-4">Admin Food List</h2>
      <Button variant="primary" onClick={() => { navigate('/admin/create') }}>Create</Button>
      </div>
      <div className={classes.tableContainer}>
        <Table className={classes.table}>
            <thead className={classes.stickyHeader}>
                <tr>
                    <th>ID</th>
                    <th>Picture</th>
                    <th>Name</th>
                    <th>Actions</th>
                    </tr>
            </thead>
            <tbody>
               {content}
             </tbody>
                </Table>
            </div>
    </Container>
  );
};

export default AdminManageRes;
