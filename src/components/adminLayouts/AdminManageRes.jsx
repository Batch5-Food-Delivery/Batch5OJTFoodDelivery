import { useDispatch, useSelector } from "react-redux";
import { Accordion, Button, Container, Row, Col } from "react-bootstrap";
import React, { useEffect } from "react";
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
import RestaurantDetails from "../../features/restaurant/RestaurantDetails";

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
    content = <p>Loading...</p>;
  }

  if (status === "success") {
    content = (
      <>
        {/* Header Row */}
        <Row className="bg-light fw-bold py-2">
          <Col xs={2}>ID</Col>
          <Col xs={2}>Picture</Col>
          <Col xs={4}>Name</Col>
          <Col xs={2}>Actions</Col>
          <Col xs={2}>Details</Col>
        </Row>

        {/* Accordion with Restaurant Data */}
        <Accordion>
          {restaurants?.map((restaurant, index) => (
            <Accordion.Item key={restaurant.id} eventKey={index}>
              <Accordion.Header>
                <Row className="w-100">
                  <Col xs={2}>{restaurant.id}</Col>
                  <Col xs={2}>
                    <img
                      src={
                        restaurant.profile !== null
                          ? `http://localhost:8686/restaurant/image/${restaurant.profile}`
                          : "https://placehold.co/400?text=Restaurant+Image"
                      }
                      alt={restaurant.name}
                      className={classes.menuImg}
                    />
                  </Col>
                  <Col xs={4}>{restaurant.name}</Col>
                  <Col xs={2}>
                    <Button
                      variant="success"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent Accordion toggle
                        handleAcceptRestaurant(restaurant.id);
                      }}
                    >
                      Accept
                    </Button>
                  </Col>
                  <Col xs={2}>View Details</Col>
                </Row>
              </Accordion.Header>
              <Accordion.Body>
                <RestaurantDetails restaurant={restaurant} />
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </>
    );
  }

  if (status === "failed") {
    content = <p className="text-danger">{error}</p>;
  }

  return (
    <Container className="my-4">
      <div>
        <h2 className="mb-4">Pending Restaurants</h2>
      </div>
      <div className={classes.tableContainer}>{content}</div>
    </Container>
  );
};

export default AdminManageRes;
