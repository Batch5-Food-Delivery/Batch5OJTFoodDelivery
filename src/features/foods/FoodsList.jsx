import { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useRestaurantMenusQuery } from "../menu/menuSlice";
import Menu from "../menu/Menu";
import NewMenuFormModal from "../menu/NewMenuFormModal";
import classes from "./foods.module.css";
import { useIsRestaurantOwnerQuery } from "../restaurant/restaurantDetailsSlice";

const FoodList = ({ restaurantId }) => {
  const {
    data: menus,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useRestaurantMenusQuery(restaurantId);

  let editable = false;
  const { data: isOwner, isSuccess: fetchingOwnerSuccess } =
    useIsRestaurantOwnerQuery(restaurantId);

  if (fetchingOwnerSuccess) {
    editable = isOwner;
  }

  const [filteredMenu, setFilteredMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  // Update categories and filtered menu when menus are successfully fetched
  useEffect(() => {
    if (isSuccess && menus) {
      // Extract categories from the menus data
      const uniqueCategories = new Set(
        menus
          .map((menu) => menu.foods.map((food) => food.category))
          .reduce((acc, categories) => acc.concat(categories), [])
      );
      setCategories([...uniqueCategories]);

      // Initially set the filtered menu to all menus
      setFilteredMenu(menus);
    }
  }, [isSuccess, menus]);

  // Handle category filtering
  const onFilter = (category) => {
    const filteredMenus = menus.map((menu) => {
      const filteredItems = menu.foods.filter(
        (item) => item.category === category
      );
      return { ...menu, foods: filteredItems };
    });
    console.log("Hey I filtered");
    console.log(filteredMenus);
    setFilteredMenu(filteredMenus);
    setActiveCategory(category);
  };

  // Reset filter to show all menus
  const onNotFilter = () => {
    setFilteredMenu(menus);
    setActiveCategory("ALL");
  };

  let content = "";
  if (isFetching) {
    content = <p>Loading......</p>;
  }

  if (isSuccess) {
    content = filteredMenu?.map((menu) => <Menu key={menu.id} menu={menu} />);
  }

  if (isError) {
    content = <p>{error?.data?.message || "Error fetching data"}</p>;
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
      {editable && (
        <>
          <Button className="btn-primary" onClick={() => setShowModal(true)}>
            New Menu
          </Button>
        </>
      )}

      <NewMenuFormModal
        show={showModal}
        handleClose={handleCloseModal}
        restaurantId={restaurantId}
      />
    </section>
  );
};

export default FoodList;
