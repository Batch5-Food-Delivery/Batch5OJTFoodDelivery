import React, { useState } from "react";
import { Button, Card, Col, Modal } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import classes from "./foods.module.css";
import FoodDetail from "./FoodDetail";
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";

const Foods = ({
  id,
  name,
  picture,
  price,
  discount,
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

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, picture, price: finalPrice, restaurantId }));
    setShow(false);
  };

  const finalPrice = discount ? price - price * (discount / 100) : price;
  picture = `http://localhost:8686/food/image/${picture}`;

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
                      ${price.toFixed(2)}
                    </small>
                    <h5 className="mb-0 finalPrice">
                      ${finalPrice.toFixed(2)}
                    </h5>
                  </>
                ) : (
                  <h5 className="mb-0">${price.toFixed(2)}</h5>
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
            </div>
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
    </>
  );
};

export default Foods;
