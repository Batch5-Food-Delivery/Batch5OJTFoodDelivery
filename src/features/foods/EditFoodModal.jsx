import { Modal, Container } from "react-bootstrap";
import {
  useRestaurantMenusQuery,
  useEditFoodMutation,
} from "../menu/menuSlice";
import FoodForm from "./FoodForm";

const EditFoodModal = ({ show, handleClose, food }) => {
  const { refetch } = useRestaurantMenusQuery(food?.restaurantId ?? "");

  const [
    editFood,
    {
      isSuccess: foodUploadSuccess,
      isLoading: foodUploading,
      isError: foodUploadFailed,
    },
  ] = useEditFoodMutation();

  let foodUploadStatus = "";

  if (foodUploading) {
    foodUploadStatus = <Container variant="primary">Updating food</Container>;
  }
  if (foodUploadFailed) {
    foodUploadStatus = (
      <Container variant="danger">Food Update failed</Container>
    );
  }
  if (foodUploadSuccess) {
    foodUploadStatus = (
      <Container variant="success">Food Update Success</Container>
    );
    setTimeout(() => refetch(), 4000);
    handleClose();
  }

  const onSubmitFood = (newFood) => {
    let reqBody = {
      food: {
        id: food.id,
        name: newFood.name,
        price: newFood.price,
        description: newFood.description,
        category: newFood.category,
        discount: newFood.discount,
        available: newFood.available,
        restaurant: {
          id: food.restaurantId,
        },
      },
      image: newFood.foodImage,
    };
    editFood(reqBody);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        style={{ "background-color": "rgb(245, 189, 7)" }}
      >
        <Modal.Title>Edit Food Item</Modal.Title>
      </Modal.Header>
      <FoodForm onSubmit={onSubmitFood} ogFood={food}></FoodForm>
      <Modal.Footer>{foodUploadStatus}</Modal.Footer>
    </Modal>
  );
};

export default EditFoodModal;
