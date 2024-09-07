import { useDispatch, useSelector } from "react-redux";

import { fetchAllMenus, getAllMenus, getError, getStatus } from "./foodSlice";
import { Button, Container, Row } from "react-bootstrap";
import Foods from "./Foods";
import { useEffect, useState } from "react";
import classes from "./foods.module.css";
import { useRestaurantMenusQuery } from "../menu/menuSlice";
import Menu from "../menu/Menu";
import NewMenuFormModal from "../menu/NewMenuFormModal";

const FoodList = ({ restaurantId }) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

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
      <Button className="btn-primary" onClick={() => setShowModal(true)}>
        New Menu
      </Button>
      <NewMenuFormModal
        show={showModal}
        handleClose={handleCloseModal}
        restaurantId={restaurantId}
      ></NewMenuFormModal>
    </section>
  );
};

export default FoodList;
