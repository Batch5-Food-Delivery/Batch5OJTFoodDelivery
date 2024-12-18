import { useState } from "react";
import Foods from "../foods/Foods";
import AddFoodModal from "../foods/AddFoodModal";
import { useIsRestaurantOwnerQuery } from "../restaurant/restaurantDetailsSlice";

const Menu = ({ menu }) => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
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
              onClick={() => setShowModal(true)}
              style={{ cursor: "pointer" }}
              class="fa fa-plus-circle"
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
        show={showModal}
        handleClose={handleClose}
        menuId={menu.id}
        restaurantId={menu.restaurant.id}
      />
    </>
  );
};

export default Menu;
