import React from "react";
import classes from "./orderPage.module.css";
import OrderConfirmModal from "../features/order/OrderConfirmModal";
import OrderBackdrop from "../features/order/OrderBackdrop";
import { useState, useEffect } from "react";
import {
  useGetUserAddressesQuery,
  useCreateAddressMutation,
} from "../features/address/addressSlice";
import AddressCard from "../features/address/AddressCard";
import { Row, Toast, ToastContainer } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useRestaurantDetailsQuery } from "../features/restaurant/restaurantDetailsSlice";
import { cartItemsByRestaurant } from "../features/cart/cartSlice";
import { useCreateOrderMutation } from "../features/order/orderSlice";

const OrderPage = ({ restaurantName, itemName, quantity, price }) => {
  const [isModalShow, setIsModalShow] = useState(false);

  function backdropHandler() {
    setIsModalShow(false);
  }

  function okHandler() {
    setIsModalShow(false);
  }

  // Address Api Management
  // Address Selection
  const [selectedAddressId, setSelectedAddressId] = useState();
  const { data: addresses, isSuccess: fetchAddressesSuccess } =
    useGetUserAddressesQuery();

  let addressCardDataList = [];
  if (fetchAddressesSuccess) {
    addressCardDataList = addresses;
  }

  const changeAddressCardSelection = (addressId) => {
    setSelectedAddressId(addressId);
  };

  // Address Creation
  const [township, setTownship] = useState();
  const [street, setStreet] = useState();
  const [additional, setAdditional] = useState();
  const [createAddress, { isSuccess: createAddressSuccess }] =
    useCreateAddressMutation();

  const onTownshipChange = (e) => {
    setTownship(e.target.value);
  };
  const onStreetChange = (e) => {
    setStreet(e.target.value);
  };
  const onAdditionalChange = (e) => {
    setAdditional(e.target.value);
  };

  const createNewAddress = () => {
    createAddress({ township, street, additionalDetails: additional });
  };

  const onAddressSubmit = (e) => {
    e.preventDefault();
    createNewAddress();

    setTownship("");
    setStreet("");
    setAdditional("");
  };

  //Restaurant Details
  const { restaurantId } = useParams();
  const { data: restaurantDetails, isSuccess: restaurantDetailsFetchSuccess } =
    useRestaurantDetailsQuery(restaurantId);

  // Cart items
  const cartItems = useSelector((state) =>
    cartItemsByRestaurant(state, parseInt(restaurantId))
  );

  // Post Order
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState("");
  const [
    createOrder,
    {
      isSuccess: createOrderSuccess,
      isError: createOrderError,
      isLoading: orderCreating,
      error: orderError,
      data: orderData,
    },
  ] = useCreateOrderMutation();

  useEffect(() => {
    if (createOrderError) {
      setShowToast(true);
      setToastTitle("Error");
      setToastMessage(
        orderError?.data ? orderError.data : "Something went wrong"
      );
      setToastBg("danger");
    } else if (createOrderSuccess) {
      setShowToast(true);
      setToastTitle("Success");
      setToastMessage(
        "Your order is successfully created. Redirecting you back to the shop page"
      );
      setToastBg("");
      console.log(orderData);
    }
  }, [createOrderError, createOrderSuccess, orderError]);

  function placeOrderHandler() {
    createOrder({
      restaurant: { id: restaurantId },
      destination: { id: selectedAddressId },
      items: cartItems.map((item) => ({
        food: { id: item.id },
        quantity: item.quantity,
      })),
    });
  }

  return (
    <>
      <div className={classes.placeorder}>
        <form className={classes.placeorderleft} onSubmit={onAddressSubmit}>
          <p className={classes.title}>Delivery Information</p>
          <Row xs={1} md={2} className="g-4">
            {addressCardDataList?.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                selected={address.id === selectedAddressId}
                onClick={() => changeAddressCardSelection(address.id)}
              ></AddressCard>
            ))}
          </Row>
          <hr></hr>
          <p className={classes.title}>New Delivery Address</p>
          <input
            type="text"
            placeholder="Township"
            onChange={onTownshipChange}
            value={township}
          />
          <input
            type="text"
            placeholder="Street"
            onChange={onStreetChange}
            value={street}
          />
          <input
            type="textarea"
            placeholder="Additional Details"
            onChange={onAdditionalChange}
            value={additional}
          />
          <button>Create</button>
        </form>

        <div className={classes.placeorderright}>
          <h3>Your Order From</h3>
          <p>
            {restaurantDetailsFetchSuccess ? restaurantDetails.name : "Loading"}
          </p>
          {cartItems.map((item) => (
            <div className={classes.orderdetail}>
              <p>{item.name}</p>
              <p>
                {item.price} x {item.quantity}
              </p>
              <p>{item.price * item.quantity}</p>
            </div>
          ))}
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

      <ToastContainer
        position="middle-center"
        className={classes.toast_middle_center}
        bg={toastBg}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{toastTitle}</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default OrderPage;
