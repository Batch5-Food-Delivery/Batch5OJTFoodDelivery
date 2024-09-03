import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { completeDelivery, removeDelivery } from "./DeliverySlice";
import classes from "./delivery.module.css";

const Delivery = ({ delivery, canComplete }) => {
  const dispatch = useDispatch();

  let button = "";

  const onComplete = (deliveryId) => {
    dispatch(completeDelivery(deliveryId));
  };

  if (!delivery.completed) {
    button = (
      <Button varient="primary" onClick={() => onComplete(delivery.id)}>
        Complete
      </Button>
    );
  }

  if (delivery.completed) {
    button = (
      <Button varient="success" disabled>
        Completed
      </Button>
    );
  }

  let cardClass = delivery.completed
    ? "mb-3 rounded border-3 bg-success"
    : "mb-3 rounded border-3 bg-primary";

  let onCardAnimationEnd = () => {};

  if (delivery.completed && canComplete) {
    cardClass = `mb-3 rounded border-3 bg-success ${classes.move_right_fade_out}`;
    onCardAnimationEnd = () => {
      dispatch(removeDelivery(delivery.id));
    };
  }

  return (
    <Card className={cardClass} onAnimationEnd={onCardAnimationEnd}>
      <Card.Header as="h5" className="p-3 text-white">
        Order Id: {delivery.id}
      </Card.Header>
      <Card.Body>
        <Row className="g-0">
          {" "}
          {/* Ensures no gutters between columns */}
          <Col md={6} className="p-3">
            <p className="card-text">From:</p>
            <p className="card-text">{delivery.restaurant.name}</p>
            <p className="card-text">
              {delivery.restaurantAddress.township}:{" "}
              {delivery.restaurantAddress.street}
            </p>
            <p className="card-text">
              {delivery.restaurantAddress.additionalDetails}
            </p>
          </Col>
          <Col md={6} className="p-3">
            <p className="card-text">To:</p>
            <p className="card-text">{delivery.customer.name}</p>
            <p className="card-text">
              {delivery.destination.township}: {delivery.destination.street}
            </p>
            <p className="card-text">
              {delivery.destination.additionalDetails}
            </p>
            {canComplete && button}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Delivery;
