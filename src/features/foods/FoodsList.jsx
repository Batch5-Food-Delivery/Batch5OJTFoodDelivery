import { useDispatch, useSelector } from "react-redux";

import { fetchAllMenus, getAllMenus, getError, getStatus } from "./foodSlice";
import { Container, Row } from "react-bootstrap";
import Foods from "./Foods";
import { useEffect } from "react";
import classes from "./foods.module.css";
import { useRestaurantMenusQuery } from "../menu/menuSlice";
import Menu from "../menu/Menu";

const FoodList = ({ restaurantId }) => {
  const {
    data: menus,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useRestaurantMenusQuery(restaurantId);

  let content = "";

  if (isFetching) {
    content = <p>Loading Foods</p>;
  }

  if (isError) {
    content = <p>There is an error</p>;
  }

  if (isSuccess) {
    content = menus?.map((menu) => <Menu menu={menu} />);
  }

  return (
    <section className={classes.menu_section}>
      <Container>
        <Row>{content}</Row>
      </Container>
    </section>
  );
};

export default FoodList;
