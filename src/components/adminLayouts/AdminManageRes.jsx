import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./adminManageRes.module.css";
import {
  fetchPendingRestaurant,
  getAllRestaurant,
  getError,
  getStatus,
  ACCEPT_URL,
} from "../../features/restaurant/restaurantSlice";
import { token } from "../../features/auth/getToken";

const AdminManageRes = () => {
  const restaurants = useSelector(getAllRestaurant);
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPendingRestaurant());
    }
  }, [status, dispatch]);

  const handleAcceptRestaurant = async (id) => {
    try {
      const response = await fetch(`${ACCEPT_URL}?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        dispatch(fetchPendingRestaurant());
      } else {
        console.error("Failed to accept restaurant");
      }
    } catch (error) {
      console.error("Error while accepting restaurant:", error);
    }
  };

  let content = "";

  if (status === "loading") {
    content = (
      <tr>
        <td colSpan="4">Loading...</td>
      </tr>
    );
  }

  if (status === "success") {
    content = restaurants?.map((restaurant) => (
      <tr key={restaurant.id} className={classes.tableRow}>
        <td>{restaurant.id}</td>
        <td>
          <img
            src={restaurant.picture}
            alt={restaurant.name}
            className={classes.menuImg}
          />
        </td>
        <td>{restaurant.name}</td>
        <td>
          <Button
            variant="success"
            onClick={() => handleAcceptRestaurant(restaurant.id)}
          >
            Success
          </Button>
        </td>
      </tr>
    ));
  }

  if (status === "failed") {
    content = (
      <tr>
        <td colSpan="4">{error}</td>
      </tr>
    );
  }

  return (
    <Container className="my-4">
      <div>
        <h2 className="mb-4">Admin Food List</h2>
        <Button
          variant="primary"
          onClick={() => {
            navigate("/admin/create");
          }}
        >
          Create
        </Button>
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
          <tbody>{content}</tbody>
        </Table>
      </div>
    </Container>
  );
};

export default AdminManageRes;
