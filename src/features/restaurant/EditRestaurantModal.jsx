import { Container, Modal } from "react-bootstrap";
import {
  useRestaurantDetailsQuery,
  useUpdateRestaurantMutation,
} from "./restaurantDetailsSlice";
import RestaurantForm from "./RestaurantForm";

const EditRestaurantModal = ({ ogRes, handleClose, show }) => {
  const [updateRestaurant, { isSuccess, isLoading, isError }] =
    useUpdateRestaurantMutation();

  const onSubmitRes = (updatedRes) => {
    let reqBody = {
      restaurant: {
        id: ogRes.id,
        name: updatedRes.name,
        description: updatedRes.description,
        address: updatedRes.address,
      },
      image: updatedRes.profile,
    };
    updateRestaurant(reqBody);
  };

  let resUpdateStatus = "";

  if (isLoading) {
    resUpdateStatus = <Container variant="primary">Updating food</Container>;
  }
  if (isError) {
    resUpdateStatus = (
      <Container variant="danger">Food Update failed</Container>
    );
  }
  if (isSuccess) {
    resUpdateStatus = (
      <Container variant="success">Food Update Success</Container>
    );
    handleClose();
  }

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
        <Modal.Title>Edit Restaurant Details</Modal.Title>
      </Modal.Header>
      <RestaurantForm ogRes={ogRes} onSubmit={onSubmitRes}></RestaurantForm>
      <Modal.Footer>{resUpdateStatus}</Modal.Footer>
    </Modal>
  );
};

export default EditRestaurantModal;
