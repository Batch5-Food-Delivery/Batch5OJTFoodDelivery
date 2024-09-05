import Foods from "../foods/Foods";

const Menu = ({ menu }) => {
  return (
    <>
      <h3>{menu.name}</h3>
      {menu.foods?.map((food) => (
        <Foods key={food.id} id={food.id} image={food.image} name={food.name} />
      ))}
    </>
  );
};

export default Menu;
