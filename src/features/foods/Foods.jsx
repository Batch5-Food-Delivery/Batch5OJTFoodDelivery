import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import classes from "./foods.module.css";


const Foods = ({id,name,image}) => {
  return (
    <Col sm={6} lg={4} xl={3} className="mb-4" >
      <Card className={`overflow-hidden ${classes.card}`}>
        <div className="overflow-hidden">
          <Card.Img variant="top" src={image} className={classes.cardImgTop}/>
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
              <Link to="/" className={classes.a}>
              <i class="bi bi-bag-fill"></i>
                
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Foods