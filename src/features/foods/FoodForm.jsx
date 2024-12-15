import { useState } from "react";
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

const FoodForm = ({ onSubmit }) => {
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

  const handleImageChange = (e) => {
    setFoodImage(e.target.files[0]); // Set the selected file
    setPreviewImage(window.URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      name,
      price,
      description,
      category,
      discount,
      available,
      foodImage,
    });
  };

  return (
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
        </Col>
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
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
  );
};

export default FoodForm;