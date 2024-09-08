import { useDispatch, useSelector } from "react-redux";
import { fetchAllMenus, getAllMenus, getError, getStatus } from "./foodSlice";
import { Button, Container, Row } from "react-bootstrap";
import Foods from "./Foods";
import { useEffect, useState } from "react";
import classes from "./foods.module.css";

const FoodList = () => {
  const dispatch = useDispatch();

  const uniqueCategories = new Set(menus.map((menu) => menu.category));
  const categories = [...uniqueCategories];

  const [filteredMenu, setFilteredMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ALL");

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  const {
    data: menus,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useRestaurantMenusQuery(restaurantId);

  const onFilter = (category) => {
    // Map through each menu to keep outer structure intact
    const filteredMenus = menus.map((menu) => {
      // Filter items based on the category, but keep the menu intact
      const filteredItems = menu.items.filter(
        (item) => item.category === category
      );

      // Return the menu with filtered items (even if filteredItems is empty)
      return { ...menu, items: filteredItems };
    });

    // Update the state with all the menus, but with filtered items
    setFilteredMenu(filteredMenus);

    // Set the active category
    setActiveCategory(category);
  };

  const onNotFilter = () => {
    setFilteredMenu(menus);
    setActiveCategory("ALL");
  };

  let content = "";

  if (isFetching) {
    content = <p>Loading......</p>;
  }

  if (status === "success") {
    content = filteredMenu?.map((menu) => (
      <Foods
        key={menu.id}
        id={menu.id}
        picture={menu.picture}
        name={menu.name}
        price={menu.price}
        discount={menu.discount}
        description={menu.description}
        category={menu.category}
        available={menu.available}
      />
    ));
  }

  if (isSuccess) {
    content = menus?.map((menu) => <Menu menu={menu} />);
  }

  if (status === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section className={classes.menu_section}>
      <Container>
        <Row>
          <div className={classes.category_container}>
            <ul className={classes.category_list}>
              <li
                className={`${classes.category_item} ${
                  activeCategory === "ALL" ? classes.active : ""
                }`}
                onClick={onNotFilter}
              >
                ALL
              </li>
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={`${classes.category_item} ${
                    activeCategory === category ? classes.active : ""
                  }`}
                  onClick={() => onFilter(category)}
                >
                  {category?.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>
        </Row>
        <Row>{content}</Row>
      </Container>
    </section>
  );
};

export default FoodList;
