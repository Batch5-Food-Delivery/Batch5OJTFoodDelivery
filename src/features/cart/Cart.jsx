import React from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import classes from "./cart.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from './cartSlice';

const Cart = () => {

  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
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
              <div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className={classes.button}
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        Remove
                      </Button>
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
