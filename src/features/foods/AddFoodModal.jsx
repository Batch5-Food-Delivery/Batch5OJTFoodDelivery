import React, { useState } from "react";
import {
  Modal,
  Form,
  Button,
  Col,
  Row,
  Image,
  Ratio,
  Container,
} from "react-bootstrap";
import {
  useRestaurantMenusQuery,
  useCreateFoodMutation,
  useUploadFoodImageMutation,
} from "../menu/menuSlice";

const MyModal = ({ show, handleClose, menuId, restaurantId }) => {
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

  const { refetch } = useRestaurantMenusQuery(restaurantId);

  const [
    uploadFoodImage,
    { data, isSuccess: foodImageUploadSuccess, reset: resetFoodImageUpload },
  ] = useUploadFoodImageMutation();

  const [name, setName] = useState("");
  const [foodImage, setFoodImage] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState("");
  const [available, setAvailable] = useState(true);
  const [previewImage, setPreviewImage] = useState("");

  const resetModal = () => {
    setPrice("");
    setDescription("");
    setCategory("");
    setDiscount("");
    setName("");
    setAvailable(true);
    setFoodImage("");
    setPreviewImage("");
  };

  let foodUploadStatus = "";
  let imageUploadStatus = "";

  if (foodUploading) {
    foodUploadStatus = <Container variant="primary">Uploading food</Container>;
  }
  if (foodUploadFailed) {
    foodUploadStatus = (
      <Container variant="danger">Food upload failed</Container>
    );
  }
  if (foodUploadSuccess) {
    console.log(foodData);
    foodUploadReset();

    if (foodImage !== null) {
      foodUploadStatus = (
        <Container variant="success">
          Food upload Success, now uploading image
        </Container>
      );
      uploadFoodImage({ image: foodImage, foodId: foodData.id });
    }
  }

  if (foodImageUploadSuccess) {
    resetFoodImageUpload();
    setTimeout(() => refetch(), 3000);
    handleClose();
    resetModal();
  }

  const onSubmitFood = (e) => {
    e.preventDefault();

    let foodItem = {
      data: {
        name,
        price,
        description,
        category,
        discount,
        available,
        menu: { id: menuId },
        restaurant: { id: restaurantId },
      },
      image: foodImage,
    };
    console.log(foodItem);
    createFood(foodItem);
  };

  const handleImageChange = (e) => {
    setFoodImage(e.target.files[0]); // Set the selected file
    setPreviewImage(window.URL.createObjectURL(e.target.files[0]));
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
      <Modal.Body>
        <Row>
          <Col md={4}>
            <Form>
              <Ratio aspectRatio="1x1">
                <Image src={previewImage} alt="Image of your food" />
              </Ratio>
              <Form.Group>
                <Form.Label style={{ "text-align": "left" }}>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*" // Restrict file type to images
                  onChange={handleImageChange}
                  required
                />
              </Form.Group>
            </Form>
            {foodUploadStatus}
            {imageUploadStatus}
          </Col>
          <Col md={8}>
            <Form onSubmit={onSubmitFood}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="text"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Availability</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    label="Available"
                    value={true}
                    checked={available === true}
                    onChange={() => setAvailable(true)}
                    name="availability"
                    required
                  />
                  <Form.Check
                    type="radio"
                    label="Unavailable"
                    value={false}
                    checked={available === false}
                    onChange={() => setAvailable(false)}
                    name="availability"
                    required
                  />
                </div>
              </Form.Group>
              <div className="d-flex justify-content-end mt-3">
                <Button variant="primary" type="submit">
                  Create
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default MyModal;
