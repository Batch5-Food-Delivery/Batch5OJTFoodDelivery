import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import {
  useCreateRestaurantMutation,
  useUploadRestaurantImageMutation,
} from "./restaurantDetailsSlice";

const RestaurantForm = ({ onSubmit }) => {
  const [message, setMessage] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [profile, setProfile] = useState(null);
  const [address, setAddress] = useState({
    township: "",
    street: "",
    additionalDetails: "",
  });

  const [
    createRestaurant,
    {
      data: resData,
      isSuccess: resUploadSuccess,
      isLoading: resUploading,
      isError: resUploadFailed,
      Error: resError,
      reset: resUploadReset,
    },
  ] = useCreateRestaurantMutation();

  const [uploadRestaurantImage, { isSuccess: imageUploadSuccess }] =
    useUploadRestaurantImageMutation();

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const onResDataSubmit = (e) => {
    e.preventDefault();
    createRestaurant({
      name,
      description,
      address: address,
    });
  };

  if (resUploadSuccess) {
    resUploadReset();
    if (profile !== null) {
      uploadRestaurantImage({ image: profile, restaurantId: resData.id });
    }
  }

  if (imageUploadSuccess) {
    alert("success");
    setMessage(
      <Container className="bg-success">
        <p>Form uploaded successfully</p>
      </Container>
    );
  }

  return (
    <Container style={{ "background-color": "rgba(255, 255, 255, 0.9)" }}>
      <Row className="mb-4">
        <h3>Restaurant Application Form</h3>
        <Col md={8}>
          <Form>
            <Form.Group controlId="formRestaurantName" className="mb-3">
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter restaurant name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter restaurant description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group controlId="formTownship" className="mb-3">
                  <Form.Label>Township</Form.Label>
                  <Form.Control
                    type="text"
                    name="township"
                    placeholder="Enter township"
                    value={address.township}
                    onChange={handleAddressChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formStreet" className="mb-3">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    name="street"
                    placeholder="Enter street"
                    value={address.street}
                    onChange={handleAddressChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formAdditionalDetails" className="mb-3">
              <Form.Label>Additional Details</Form.Label>
              <Form.Control
                type="text"
                name="additionalDetails"
                placeholder="Enter additional address details"
                value={address.additionalDetails}
                onChange={handleAddressChange}
              />
            </Form.Group>
          </Form>
        </Col>

        <Col md={4}>
          <Form>
            <Form.Group controlId="formProfile" className="mb-3">
              <Form.Label>Profile</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </Form.Group>
          </Form>
          {message}
        </Col>
      </Row>

      <Button variant="primary" onClick={onResDataSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default RestaurantForm;
