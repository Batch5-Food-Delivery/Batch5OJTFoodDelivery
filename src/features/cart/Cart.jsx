import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import classes from "./cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart, cartItemsByRestaurant } from "./cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = ({ restaurantId }) => {
  //const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const cartItems = useSelector((state) =>
    cartItemsByRestaurant(state, restaurantId)
  );
  const dispatch = useDispatch();

  const calculateDiscountedPrice = (price, discount) => {
    return discount ? price - price * (discount / 100) : price;
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = calculateDiscountedPrice(
        item.price,
        item.discount
      );
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = async () => {
    /*try {
      const response = await axios.post("http://localhost:8686/order/create", {
        items: cartItems,
      });
      if (response.status === 201) {
        dispatch(clearCart());
        alert("Order placed successfully!");
      } else {
        alert("Failed to place the order.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during checkout.");
    }*/

    navigate(`/restaurant/${restaurantId}/orderCheckout`);
  };
  return (
    <div className={classes.cartWrapper}>
      <Card className={classes.cart}>
        <Card.Body>
          <Card.Title>Your Cart</Card.Title>
          <div className={classes.cartItemsContainer}>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id} className={classes.cartItem}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6>{item.name}</h6>
                      <p className="mb-0">
                        {calculateDiscountedPrice(
                          item.price,
                          item.discount
                        ).toFixed(2)}
                        Ks x {item.quantity}
                      </p>
                      {item.discount > 0 && (
                        <p className="mb-0 text-success">
                          Discount: {item.discount}%
                        </p>
                      )}
                    </div>

                    <div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className={classes.button}
                      >
                        -
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className={classes.button}
                      >
                        +
                      </Button>
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
            <h5>{calculateTotalPrice().toFixed(2)}Ks</h5>
          </div>
          <Button
            variant="primary"
            className="mt-3 w-100"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cart;
