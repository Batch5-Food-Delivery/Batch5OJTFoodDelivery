import React from "react";
import RegionList from "../features/region/RegionList";
import RestaurantList from "../features/restaurant/RestaurantList";
import classes from "./shopPage.module.css";
import { Card } from "react-bootstrap";
import CarouselComponent from "../components/ui/CarouselComponent";

const ShopPage = () => {
  return (
    <>
      <CarouselComponent />
      <div className={classes.searchContainer}>
        <form className={classes.searchForm}></form>
      </div>

      <RestaurantList></RestaurantList>
    </>
  );
};

export default ShopPage;
