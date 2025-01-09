import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import classes from "./foodDetail.module.css";

const FoodDetail = ({ food, handleAddToCart }) => {
  return (
    <div className={classes.foodDetailWrapper}>
      <Card className={classes.foodDetailCard}>
        <Card.Img
          variant="top"
          src={food.picture}
          className={classes.foodImage}
        />
        <Card.Body>
          <Card.Title className={classes.foodTitle}>{food.name}</Card.Title>
          <Card.Text className={classes.foodDescription}>
            {food.description}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item className={classes.foodDetailItem}>
            <strong>Price:</strong> {food.price} Ks
          </ListGroup.Item>
          <ListGroup.Item className={classes.foodDetailItem}>
            <strong>Discount:</strong> {food.discount}%
          </ListGroup.Item>
          <ListGroup.Item className={classes.foodDetailItem}></ListGroup.Item>
        </ListGroup>

        <Card.Body>
          <Button
            variant="primary"
            className={classes.addButton}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FoodDetail;
