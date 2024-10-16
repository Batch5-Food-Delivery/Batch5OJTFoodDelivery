import React from "react";
import classes from "./orderPage.module.css";
import OrderConfirmModal from "../features/order/OrderConfirmModal";
import OrderBackdrop from "../features/order/OrderBackdrop";
import { useState } from "react";
import {
  useGetUserAddressesQuery,
  useCreateAddressMutation,
} from "../features/address/addressSlice";
import AddressCard from "../features/address/AddressCard";
import { Row } from "react-bootstrap";

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
