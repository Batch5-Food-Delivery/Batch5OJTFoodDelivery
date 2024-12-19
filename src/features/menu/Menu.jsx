import { useState } from "react";
import Foods from "../foods/Foods";
import AddFoodModal from "../foods/AddFoodModal";
import { useIsRestaurantOwnerQuery } from "../restaurant/restaurantDetailsSlice";
import EditMenuFormModal from "./EditMenuFormModal";

const Menu = ({ menu }) => {
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const handleFoodClose = () => {
    setShowFoodModal(false);
  };

  const handleMenuClose = () => {
    setShowMenuModal(false);
  };

  let editable = false;

  const { data: isOwner, isSuccess: fetchingOwnerSuccess } =
    useIsRestaurantOwnerQuery(menu.restaurant.id);

  if (fetchingOwnerSuccess) {
    editable = isOwner;
  }

  return (
    <>
      <h4>
        {menu.name}
        {"  "}
        {editable && (
          <>
            <i
              onClick={() => setShowFoodModal(true)}
              style={{ cursor: "pointer", "margin-right": "15px" }}
              class="fa fa-plus-circle"
            ></i>

            <i
              onClick={() => setShowMenuModal(true)}
              style={{ cursor: "pointer" }}
              class="fa fa-edit"
            ></i>
          </>
        )}
      </h4>
      {menu.foods?.map((food) => (
        <Foods
          key={food.id}
          id={food.id}
          name={food.name}
          picture={food.picture}
          price={food.price}
          discount={food.discount}
          category={food.category}
          description={food.description}
          available={food.available}
          restaurantId={food.restaurant.id}
        />
      ))}
      <hr></hr>
      <AddFoodModal
        show={showFoodModal}
        handleClose={handleFoodClose}
        menuId={menu.id}
        restaurantId={menu.restaurant.id}
      />

      <EditMenuFormModal
        show={showMenuModal}
        handleClose={handleMenuClose}
        menu={menu}
      />
    </>
  );
};

export default Menu;
