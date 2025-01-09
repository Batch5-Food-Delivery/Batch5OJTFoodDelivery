import React, { useState } from "react";
import { Button, Card, Col, Modal } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import classes from "./foods.module.css";
import FoodDetail from "./FoodDetail";
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";
import EditFoodModal from "./EditFoodModal";
import DeleteFoodModal from "./DeleteFoodModal";
import { useIsRestaurantOwnerQuery } from "../restaurant/restaurantDetailsSlice";

const Foods = ({
  id,
  name,
  picture,
  price,
  discount,
  category,
  description,
  available,
  restaurantId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setSelectedFood({
      id,
      name,
      picture,
      discount,
      description,
      price,
      restaurantId,
    });
    setShow(true);
  };

  let authorized = false;
  const { data: isOwner, isSuccess: fetchingOwnerSuccess } =
    useIsRestaurantOwnerQuery(restaurantId);

  if (fetchingOwnerSuccess) {
    authorized = isOwner;
  }

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => {
    setSelectedFood({
      id,
      name,
      picture,
      discount,
      category,
      description,
      price,
      available,
      restaurantId,
    });
    setShowEdit(true);
  };

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => {
    setSelectedFood({
      id,
      name,
      picture,
      discount,
      category,
      description,
      price,
      available,
      restaurantId,
    });
    setShowDelete(true);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, picture, price: finalPrice, restaurantId }));
    setShow(false);
  };

  const finalPrice = discount ? price - price * (discount / 100) : price;
  picture =
    picture !== null
      ? `http://localhost:8686/food/image/${picture}`
      : "https://placehold.co/400?text=Food+Item";

  return (
    <>
      <Col sm={6} lg={4} xl={3} className="mb-4">
        <Card className={`overflow-hidden ${classes.card}`}>
          <div className={`overflow-hidden ${available ? "" : classes.dimmed}`}>
            <Card.Img
              variant="top"
              src={picture}
              className={classes.cardImgTop}
              onClick={handleShow}
            />
            {discount > 0 && (
              <div className={classes.discountBadge}>
                <span className={classes.discountText}>{discount}% OFF</span>
              </div>
            )}
          </div>
          <Card.Body>
            <div className="d-flex align-items-center justify-content-between">
              <Card.Title className={classes.cardTitle}>{name}</Card.Title>

              <div className="d-flex align-items-center">
                <div className={classes.wishlist}>
                  <i className="bi bi-heart"></i>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <div className="menu_price">
                {discount ? (
                  <>
                    <small className={classes.originalPrice}>
                      {price.toFixed(2)}
                    </small>
                    <h5 className="mb-0 finalPrice">
                      {finalPrice.toFixed(2)}Ks
                    </h5>
                  </>
                ) : (
                  <h5 className="mb-0">{price.toFixed(2)}Ks</h5>
                )}
              </div>

              <div className={classes.add_to_card}>
                {available ? (
                  <Link to="" className={classes.a} onClick={handleAddToCart}>
                    <i className="bi bi-bag-fill"></i>
                  </Link>
                ) : (
                  <span className={classes.availabilityBadge}>Unavailable</span>
                )}
              </div>

              <div className={classes.add_to_card}></div>
            </div>
            {authorized && (
              <div>
                <i
                  onClick={handleShowEdit}
                  style={{ cursor: "pointer", "margin-right": "15px" }}
                  class="fa fa-edit float-end"
                ></i>
                <i
                  onClick={handleShowDelete}
                  style={{ cursor: "pointer", "margin-right": "15px" }}
                  class="fa fa-trash float-end"
                ></i>{" "}
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <FoodDetail
            food={selectedFood}
            handleAddToCart={() => handleAddToCart()}
          />
        </Modal.Body>
      </Modal>

      <EditFoodModal
        food={selectedFood}
        show={showEdit}
        handleClose={handleCloseEdit}
      />
      <DeleteFoodModal
        food={selectedFood}
        show={showDelete}
        handleClose={handleCloseDelete}
      />
    </>
  );
};

export default Foods;
