import { Modal, Container } from "react-bootstrap";
import {
  useRestaurantMenusQuery,
  useCreateFoodMutation,
} from "../menu/menuSlice";
import FoodForm from "./FoodForm";

const MyModal = ({ show, handleClose, menuId, restaurantId }) => {
  const { refetch } = useRestaurantMenusQuery(restaurantId);
  const [
    createFood,
    {
      data: foodData,
      isSuccess: foodUploadSuccess,
      isLoading: foodUploading,
      isError: foodUploadFailed,
      reset: foodUploadReset,
    },
  ] = useCreateFoodMutation();

  let foodUploadStatus = "";

  if (foodUploading) {
    foodUploadStatus = <Container variant="primary">Uploading food</Container>;
  }
  if (foodUploadFailed) {
    foodUploadStatus = (
      <Container variant="danger">Food upload failed</Container>
    );
  }
  if (foodUploadSuccess) {
    foodUploadStatus = (
      <Container variant="success">Food upload Success</Container>
    );
    foodUploadReset();
    setTimeout(() => refetch(), 4000);
    handleClose();
  }

  const onSubmitFood = (newFood) => {
    let reqBody = {
      food: {
        name: newFood.name,
        price: newFood.price,
        description: newFood.description,
        category: newFood.category,
        discount: newFood.discount,
        available: newFood.available,

        menu: { id: menuId },
        restaurant: { id: restaurantId },
      },
      image: newFood.foodImage,
    };
    createFood(reqBody);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Create new food</Modal.Title>
      </Modal.Header>
      <FoodForm onSubmit={onSubmitFood}></FoodForm>
      <Modal.Footer>{foodUploadStatus}</Modal.Footer>
    </Modal>
  );
};

export default MyModal;
