import React from "react";
import RegionList from "../features/region/RegionList";
import RestaurantList from "../features/restaurant/RestaurantList";
import classes from "./shopPage.module.css";
import { Card } from "react-bootstrap";

const ShopPage = () => {
  return (
    <>
      <Card className={classes.card}>
        <Card.Img
          style={{ height: "30rem" }}
          variant="top"
          src="/images/home-cover.jpg"
        />
      </Card>

      <div className={classes.form}>
        <h6 className={classes.welcome}>Welcome Customer</h6>
        <form className="d-flex bg-warning " role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Your Fav Restaurant Here"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>

      <RegionList></RegionList>
      <RestaurantList></RestaurantList>
    </>
  );
};

export default ShopPage;
