import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./menuCart.css";

import FoodList from "../../features/foods/FoodsList";
import Cart from "../../features/cart/Cart";
import { useParams } from "react-router-dom";
import {
  useIsRestaurantOwnerQuery,
  useRestaurantDetailsQuery,
} from "../../features/restaurant/restaurantDetailsSlice";

const MenuCartLayout = () => {
  const { restaurantId } = useParams();
  const {
    data: restaurant,
    isFetching,
    isSuccess,
  } = useRestaurantDetailsQuery(restaurantId);

  const [showOrders, setShowOrders] = useState(false);
  const { data: isOwner, isSuccess: fetchingOwnerSuccess } =
    useIsRestaurantOwnerQuery(restaurantId);

  useEffect(() => {
    if (fetchingOwnerSuccess) {
      setShowOrders(isOwner);
    }
  }, [fetchingOwnerSuccess, isOwner]);

  let content = "";
  let picture = `http://localhost:8686/restaurant/image/${restaurant?.profile}`;

  if (isFetching) {
    content = (
      <>
        <h2>Restaurant is loading</h2>
      </>
    );
  }

  if (isSuccess) {
    content = (
      <div style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
        <Row
          className="mt-3 align-items-center"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <Col md={3}>
            <div>
              <img
                src={picture}
                alt="Mont Zay Tan (MICT) vendor logo"
                style={{ width: "100%" }}
              />
            </div>
          </Col>
          <Col md={9}>
            <ul className="main-info__characteristics">
              <li>Italian</li>
              <li>Pizza</li>
              <li>Chinese</li>
              <li>Asian</li>
              <li>Thai</li>
            </ul>
            <h2>{restaurant.name}</h2>

            <div className="main-info__meta-information">
              <div className="vendor-rating">
                <span>4.7/5 (5000+)</span>
              </div>
              <p>See reviews</p>
              <p>{restaurant.description}</p>
            </div>

            {showOrders && (
              <button className="btn-btn float-end">
                <div className="btn-text">Orders</div>
              </button>
            )}
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={8}>
            <FoodList restaurantId={restaurant.id} />
          </Col>
          <Col lg={4}>
            <Cart restaurantId={restaurant.id} />
          </Col>
        </Row>
      </div>
    );
  }

  return content;
};

export default MenuCartLayout;
