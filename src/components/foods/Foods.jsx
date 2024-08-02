import React, { useState } from 'react'
import { Card, Col, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import classes from "./foods.module.css";
import FoodDetail from './FoodDetail';
import { useDispatch } from 'react-redux';
import { addToCart } from '../cart/cartSlice';


const Foods = ({id,name,image}) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, image, price: 20 }));
  }




  return (
    <>
    <Col sm={6} lg={4} xl={3} className="mb-4">
      <Card className={`overflow-hidden ${classes.card}`}>
        <div className="overflow-hidden">
          <Card.Img variant="top" src={image} className={classes.cardImgTop} onClick={handleShow}/>
        </div>
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            {/*<div className="item_rating">{renderRatingIcons(rating)}</div> */}
            <div className={classes.wishlist}>
              <i class="bi bi-heart"></i>
            </div>
          </div>

          <Card.Title>{name}</Card.Title>
          

          <div className="d-flex align-items-center justify-content-between">
           {
                <div className="menu_price">
                <h5 className="mb-0">$20</h5>
              </div>

           }
            
            <div className={classes.add_to_card}>
              <Link to="" className={classes.a} onClick={handleAddToCart}>
              <i class="bi bi-bag-fill"></i>
                
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
         
        </Modal.Header>
        <Modal.Body>
         <FoodDetail/>
        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default Foods