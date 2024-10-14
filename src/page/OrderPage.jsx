import React from "react";
import classes from "./orderPage.module.css";
import OrderConfirmModal from "../features/order/OrderConfirmModal";
import OrderBackdrop from "../features/order/OrderBackdrop";
import { useState } from "react";

const OrderPage = ({ restaurantName, itemName, quantity, price }) => {
  const [isModalShow, setIsModalShow] = useState(false);

  function placeOrderHandler() {
    setIsModalShow(true);
  }

  function backdropHandler() {
    setIsModalShow(false);
  }

  function okHandler() {
    setIsModalShow(false);
  }

  return (
    <>
      <div className={classes.placeorder}>
        <form className={classes.placeorderleft}>
          <p className={classes.title}>Delivery Information</p>
          <div className={classes.multifields}>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <input type="text" placeholder="Street" />
          <input type="text" placeholder="Township" />
          <div className={classes.multifields}>
            <input type="text" placeholder="City" />
            <input type="text" placeholder="Region" />
          </div>
          <div>
            <input type="text" placeholder="Phone" />
          </div>
          <input type="textarea" placeholder="Add Note" />
          <button>Confirm</button>
        </form>

        <div className={classes.placeorderright}>
          <h3>Your Order From</h3>
          <p>{restaurantName}</p>
          <div className={classes.orderdetail}>
            <p>{quantity}</p>
            <p>x</p>
            <p>{itemName}</p>
            <p>{price * quantity}</p>
          </div>
          <hr />
          <div className={classes.total}>
            <p>SubTotal</p>
            <p>{0}MMK</p>
          </div>
          <hr />
          <div className={classes.total}>
            <p>Delivery Fee</p>
            <p>500MMK</p>
          </div>
          <hr />
          <div className={classes.total}>
            <b>Total</b>
            <b>{0}MMK</b>
          </div>
          <br />
          <button onClick={placeOrderHandler}> Place Order</button>
        </div>
      </div>
      {isModalShow && <OrderBackdrop onBackdrop={backdropHandler} />}
      {isModalShow && <OrderConfirmModal onOk={okHandler} />}
    </>
  );
};

export default OrderPage;
