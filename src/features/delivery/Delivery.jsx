import React from "react";
import { Card, Button, Row, Col, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import classes from "./delivery.module.css";
import { useCompleteDeliveryMutation, deliverySlice } from "./DeliverySlice";

const Delivery = ({ delivery, canComplete }) => {
  const dispatch = useDispatch();

  const [
    completeDelivery,
    { isLoading: isCompleting, isError, isSuccess, reset, error },
  ] = useCompleteDeliveryMutation();

  let button = "";
  let cardClass = "";
  let errorAlert = "";
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

  if (delivery.completed) {
    button = (
      <Button varient="success" disabled>
        Completed
      </Button>
    );

    cardClass = "mb-3 rounded border-3 bg-success";
  }

  if (isCompleting) {
    errorAlert = "";
    button = (
      <Button varient="secondary" disabled>
        Completing
      </Button>
    );
  }

  if (isSuccess) {
    cardClass = `mb-3 rounded border-3 bg-success ${classes.move_right_fade_out}`;
    onCardAnimationEnd = () => {
      dispatch(deliverySlice.util.invalidateTags(["DriverDeliveries"]));
      reset();
    };
  }

  if (isError) {
    errorAlert = (
      <Alert variant="warning">
        {error.data ? error.data : "Something went wrong"}
      </Alert>
    );
    button = (
      <Button varient="primary" onClick={() => onComplete(delivery.id)}>
        Try again
      </Button>
    );
  }

  return (
    <Card className={cardClass} onAnimationEnd={() => onCardAnimationEnd()}>
      <Card.Header as="h5" className="p-3 text-white">
        Delivery Id: {delivery.id}
      </Card.Header>
      <Card.Body className="bg-white">
        <Row className="g-0">
          {" "}
          {/* Ensures no gutters between columns */}
          <Col md={6} className="p-3">
            <p className="card-text m-0 p-0">From:</p>
            <p className="card-text m-0 p-0">{delivery.restaurant.name}</p>
            <p className="card-text m-0 p-0">
              {delivery.restaurantAddress?.township}:{" "}
              {delivery.restaurantAddress?.street}
            </p>
            <p className="card-text m-0 p-0">
              {delivery.restaurantAddress?.additionalDetails}
            </p>
          </Col>
          <Col md={6} className="p-3">
            <p className="card-text m-0 p-0">To:</p>
            <p className="card-text m-0 p-0">{delivery.customer.name}</p>
            <p className="card-text m-0 p-0">
              {delivery.destination.township}: {delivery.destination.street}
            </p>
            <p className="card-text m-0 p-0">
              {delivery.destination.additionalDetails}
            </p>
            {canComplete && (
              <div className="d-flex justify-content-end">{button}</div>
            )}
          </Col>
        </Row>
        {errorAlert}
      </Card.Body>
    </Card>
  );
};

export default Delivery;
