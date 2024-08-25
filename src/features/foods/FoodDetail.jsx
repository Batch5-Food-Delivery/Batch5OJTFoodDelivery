import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import classes from "./foodDetail.module.css";


const FoodDetail = ({food}) => {
 
 
  return (

    <div className={classes.foodDetailWrapper}>
    <Card className={classes.foodDetailCard}>
      <Card.Img
        variant="top"
        src={food.image}
        className={classes.foodImage}
      />
      <Card.Body>
        <Card.Title className={classes.foodTitle}>{food.name}</Card.Title>
        <Card.Text className={classes.foodDescription}>
        A delightful plate of pasta with a rich tomato sauce, fresh basil, and parmesan cheese. Perfect for a quick meal or a fancy dinner.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className={classes.foodDetailItem}>
          <strong>Price:</strong> $12.99
        </ListGroup.Item>
        <ListGroup.Item className={classes.foodDetailItem}>
          <strong>Calories:</strong> 450 kcal
        </ListGroup.Item>
        <ListGroup.Item className={classes.foodDetailItem}>
          <strong>Ingredients:</strong> Pasta, Tomato, Basil, Parmesan Cheese,
          Olive Oil, Garlic
        </ListGroup.Item>
      </ListGroup>
      
      <Card.Body>
        <Button variant="primary" className={classes.addButton}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
    </div>
  );
};

export default FoodDetail;
