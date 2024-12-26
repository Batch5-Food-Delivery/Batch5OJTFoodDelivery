import React, { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Ratio,
  Image,
} from "react-bootstrap";

const RestaurantForm = ({ onSubmit, ogRes }) => {
  const [name, setName] = useState(ogRes?.name ?? "");
  const [description, setDescription] = useState(ogRes?.description ?? "");
  const [profile, setProfile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    ogRes?.profile !== null
      ? `http://localhost:8686/restaurant/image/${ogRes.profile}`
      : "https://placehold.co/400?text=Restaurant+Image"
  );
  const [address, setAddress] = useState({
    township: ogRes?.address?.township ?? "",
    street: ogRes?.address?.street ?? "",
    additionalDetails: ogRes?.address?.additionalDetails ?? "",
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProfile(e.target.files[0]); // Set the selected file
    setPreviewImage(window.URL.createObjectURL(e.target.files[0]));
  };

  const onResDataSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      address: address,
      profile,
    });
  };

  return (
    <>
      <Row className="mb-4">
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
            <Ratio aspectRatio="1x1">
              <Image src={previewImage} alt="Image of your Restaurant" />
            </Ratio>
            <Form.Group controlId="formProfile" className="mb-3">
              <Form.Label>Profile</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Button variant="primary" onClick={onResDataSubmit}>
        Submit
      </Button>
    </>
  );
};

export default RestaurantForm;
