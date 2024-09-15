import React from 'react'
import { Carousel } from 'react-bootstrap';
import classes from'./carousel.module.css'

const CarouselComponent = () => {
  return (
    <Carousel className={classes.carouselContainer}>
      <Carousel.Item>
        <img
          className={`d-block w-100 ${classes.carouselImage}`}
          src="/images/home-cover.jpg"
          alt="First slide"
        />
        <Carousel.Caption className={classes.carouselItem}>
          <h3>Welcome to Dreamland Food</h3>
          <p>Order your favorite dishes easily.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={`d-block w-100 ${classes.carouselImage}`}
          src="/images/food-delivery.jpg"
          alt="Second slide"
        />
        <Carousel.Caption className={classes.carouselItem}>
          <h3>Delicious Meals, Fast Delivery</h3>
          <p>Enjoy fresh food at your doorstep.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
);
  
}

export default CarouselComponent