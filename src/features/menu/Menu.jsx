import { useState } from "react";
import Foods from "../foods/Foods";
import AddFoodModal from "../foods/AddFoodModal";

const Menu = ({ menu }) => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <h4>
        {menu.name} <span onClick={() => setShowModal(true)}>+</span>{" "}
      </h4>
      {menu.foods?.map((food) => (
        <Foods
          key={food.id}
          id={food.id}
          name={food.name}
          picture={food.picture}
          price={food.price}
          discount={food.discount}
          description={food.description}
          available={food.available}
        />
      ))}
      <hr></hr>
      <AddFoodModal
        show={showModal}
        handleClose={handleClose}
        menuId={menu.id}
        restaurantId={menu.restaurant.id}
      />
    </>
  );
};

export default Menu;
