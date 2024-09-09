import Foods from "../foods/Foods";

const Menu = ({ menu }) => {
  return (
    <>
      <h3>{menu.name}</h3>
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
    </>
  );
};

export default Menu;
