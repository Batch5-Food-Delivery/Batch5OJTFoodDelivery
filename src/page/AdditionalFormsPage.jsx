import React, { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import RestaurantForm from "../features/restaurant/RestaurantForm";
import DriverForm from "../features/user/DriverForm";
import CreateRestaurant from "../features/restaurant/CreateRestaurant";

const AdditionalFormsPage = () => {
  const [activeForm, setActiveForm] = useState("restaurant");

  const renderForm = () => {
    switch (activeForm) {
      case "restaurant":
        return <CreateRestaurant />;
      case "driver":
        return <DriverForm />;
      default:
        return <div>Select a form to display</div>;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-light vh-100">
          <h4 className="mt-3">Additional Forms</h4>
          <Nav
            variant="pills"
            className="flex-column"
            activeKey={activeForm}
            onSelect={(selectedKey) => setActiveForm(selectedKey)}
          >
            <Nav.Item>
              <Nav.Link eventKey="restaurant">Restaurant Form</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="driver">Driver Form</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={10} className="p-4">
          {renderForm()}
        </Col>
      </Row>
    </Container>
  );
};

export default AdditionalFormsPage;
