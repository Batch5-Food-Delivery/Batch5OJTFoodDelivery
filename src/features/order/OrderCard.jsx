import React from "react";
import { Card } from "react-bootstrap";
import classes from "./OrderCard.module.css";

const OrderCard = ({ order, canComplete }) => {
  return (
    <Card className="mb-3 w-100 p-2">
      <Card.Body>
        <Card.Title>Order #{order.id}</Card.Title>
        <Card.Text>
          <strong>Customer:</strong> {order.customer.firstname}{" "}
          {order.customer.lastname} <br />
          <strong>Restaurant:</strong> {order.restaurant.name} <br />
          {/* Items section styled like a table */}
          <div className={classes.orderItemGridHeader}>
            <div>Food Name</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Subtotal</div>
          </div>
          {order.items.map((item) => (
            <div key={item.id} className={classes.orderItemGrid}>
              <div>{item.food.name}</div>
              <div>${item.price.toFixed(2)}</div>
              <div>{item.quantity}</div>
              <div>${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
          <hr></hr>
          <div className={classes.orderItemGrid}>
            <div>
              <strong>Total: </strong>
            </div>
            <div></div>
            <div></div>
            <div>${order.total.toFixed(2)}</div>
          </div>
          {/* Other order details */}
          <strong>Destination:</strong> {order.destination.street} <br />
          <strong>Completed:</strong> {order.completed ? "Yes" : "No"} <br />
          <strong>Started At:</strong>{" "}
          {new Date(order.startedAt).toLocaleString()} <br />
          {order.completed && (
            <span>
              <strong>Completed At:</strong>{" "}
              {new Date(order.completedAt).toLocaleString()}
            </span>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default OrderCard;
