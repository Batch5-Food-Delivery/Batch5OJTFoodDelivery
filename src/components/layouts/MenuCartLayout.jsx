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
import RestaurantDetails from "../../features/restaurant/RestaurantDetails";
import EditRestaurantModal from "../../features/restaurant/EditRestaurantModal";

const MenuCartLayout = () => {
  const { restaurantId } = useParams();
  const {
    data: restaurant,
    isFetching,
    isSuccess,
  } = useRestaurantDetailsQuery(restaurantId);

  const [authorized, setAuthorized] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { data: isOwner, isSuccess: fetchingOwnerSuccess } =
    useIsRestaurantOwnerQuery(restaurantId);

  useEffect(() => {
    if (fetchingOwnerSuccess) {
      setAuthorized(isOwner);
    }
  }, [fetchingOwnerSuccess, isOwner]);

  const handleEditClose = () => {
    setShowEditModal(false);
  };

  let content = "";

  if (isFetching) {
    content = (
      <>
        <h2>Restaurant is loading</h2>
      </>
    );
  }

  if (isSuccess) {
    console.log(restaurant);
    content = (
      <div style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
        <RestaurantDetails restaurant={restaurant} />

        <Row>
          <Col>
            {authorized && (
              <>
                <button className="btn-btn float-end">
                  <div className="btn-text">Orders</div>
                </button>
                <button
                  className="btn-btn float-end"
                  onClick={() => setShowEditModal(true)}
                >
                  <div className="btn-text">Edit</div>
                </button>
              </>
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

        <EditRestaurantModal
          ogRes={restaurant}
          show={showEditModal}
          handleClose={handleEditClose}
        />
      </div>
    );
  }

  return content;
};

export default MenuCartLayout;
