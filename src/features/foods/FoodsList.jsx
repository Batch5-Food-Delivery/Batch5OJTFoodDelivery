import { useDispatch, useSelector } from "react-redux";
import { fetchAllMenus, getAllMenus, getError, getStatus } from "./foodSlice";
import { Container, Row } from "react-bootstrap";
import Foods from "./Foods";
import { useEffect, useState } from "react";
import classes from "./foods.module.css";

const FoodList = () => {
  const menus = useSelector(getAllMenus);
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const dispatch = useDispatch();

  const uniqueCategories = new Set(menus.map((menu) => menu.category));
  const categories = [...uniqueCategories];

  const [filteredMenu, setFilteredMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ALL");

  // Show all menus by default when the component mounts
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllMenus());
    }

    if (status === "success" && menus.length > 0) {
      setFilteredMenu(menus);
    }
  }, [status, dispatch, menus]);

  const onFilter = (category) => {
    setFilteredMenu(menus.filter((menu) => menu.category === category));
    setActiveCategory(category);
  };

  const onNotFilter = () => {
    setFilteredMenu(menus);
    setActiveCategory("ALL");
  };

  let content = "";

  if (status === "loading") {
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
