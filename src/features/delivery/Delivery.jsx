import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import classes from "./delivery.module.css";
import { useCompleteDeliveryMutation, deliverySlice } from "./DeliverySlice";

const Delivery = ({ delivery, canComplete }) => {
  const dispatch = useDispatch();

  const [
    completeDelivery,
    { isLoading: isCompleting, isError, isSuccess, reset },
  ] = useCompleteDeliveryMutation();

  let button = "";
  let cardClass = "";
  let onCardAnimationEnd = () => {};

  const onComplete = (deliveryId) => {
    completeDelivery(deliveryId);
  };

  if (!delivery.completed && canComplete) {
    button = (
      <Button varient="primary" onClick={() => onComplete(delivery.id)}>
        Complete
      </Button>
    );

    cardClass = "mb-3 rounded border-3 bg-primary";
  }

  if (isSuccess) {
    console.log("handling success");
    cardClass = `mb-3 rounded border-3 bg-success ${classes.move_right_fade_out}`;
    onCardAnimationEnd = () => {
      dispatch(deliverySlice.util.invalidateTags(["DriverDeliveries"]));
      reset();
    };
  }

  if (isError) {
    dispatch(deliverySlice.util.invalidateTags(["DriverDeliveries"]));
    reset();
  }

  if (delivery.completed) {
    button = (
      <Button varient="success" disabled>
        Completed
      </Button>
    );

    cardClass = "mb-3 rounded border-3 bg-success";
  }

  return (
    <Card className={cardClass} onAnimationEnd={() => onCardAnimationEnd()}>
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
