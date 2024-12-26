import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import classes from "./restaurant.module.css";

const Restaurant = ({ name, profile, description }) => {
  let picture =
    profile !== null
      ? `http://localhost:8686/restaurant/image/${profile}`
      : "https://placehold.co/400?text=Restaurant+Image";

  return (
    <Col sm={12} md={3} lg={3} xl={4} className="my-4">
      <Card style={{ width: "90%" }} className={classes.card}>
        <Card.Body className="p-4 shadow-sm">
          <Card.Title className={classes.shopName}>{name}</Card.Title>
          <Card.Img
            variant="top"
            style={{ height: "10rem" }}
            className="w-100"
            src={picture}
          />
          <p className={classes.description}>
            {String(description).slice(0, 80) + "...."}
          </p>
          <div className="d-flex justify-content-end">
            <Button variant="primary" className="">
              View
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Restaurant;
