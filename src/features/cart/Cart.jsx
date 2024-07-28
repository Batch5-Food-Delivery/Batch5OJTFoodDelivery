import React from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import classes from "./cart.module.css";

const Cart = () => {

    const cartItems = [
        { id: 1, name: 'Pizza', price: 20, quantity: 1 },
        { id: 2, name: 'Burger', price: 15, quantity: 2 },
        { id: 2, name: 'Burger', price: 15, quantity: 2 },
        { id: 2, name: 'Burger', price: 15, quantity: 2 },
        { id: 2, name: 'Burger', price: 15, quantity: 2 },
        { id: 2, name: 'Burger', price: 15, quantity: 2 },
        { id: 2, name: 'Burger', price: 15, quantity: 2 },
        { id: 2, name: 'Burger', price: 15, quantity: 2 },
        { id: 2, name: 'Burger', price: 15, quantity: 2 },
        { id: 2, name: 'Burger', price: 15, quantity: 2 },
        { id: 2, name: 'Burger', price: 15, quantity: 2 },
        
        // Add more items as needed
      ];
  return (

    <div className={classes.cartWrapper}>
    <Card className={classes.cart}>
    <Card.Body>
      <Card.Title>Your Cart</Card.Title>
      <div className={classes.cartItemsContainer}>
      <ListGroup variant="flush">
        {cartItems.map(item => (
          <ListGroup.Item key={item.id} className={classes.cartItem}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6>{item.name}</h6>
                <p className="mb-0">${item.price} x {item.quantity}</p>
              </div>
              <div>
                <Button variant="outline-danger" size="sm" className={classes.button}>-</Button>
                <Button variant="outline-primary" size="sm" className={classes.button}>+</Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <h5>Total:</h5>
        <h5>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h5>
      </div>
      <Button variant="primary" className="mt-3 w-100">Checkout</Button>
    </Card.Body>
  </Card>
  </div>
  );
};

export default Cart;
