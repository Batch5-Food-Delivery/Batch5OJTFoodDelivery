import React, { useState } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { useCreateMenuMutation } from "./menuSlice";

const NewMenuFormModal = ({ show, handleClose, restaurantId }) => {
  const [menuName, setMenuName] = useState("");

  const [createMenu, { isError, isLoading, isSuccess, error, reset }] =
    useCreateMenuMutation();

  let message = "";
  if (isError) {
    message = (
      <>
        <Container className="container-danger">{error.data}</Container>
      </>
    );
  }
  if (isLoading) {
    message = (
      <>
        <Container className="container-danger">"Creating new Menu"</Container>
      </>
    );
  }
  if (isSuccess) {
    reset();
    handleClose();
    setMenuName("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Menu Submitted:", menuName);

    let menu = {
      name: menuName,
      restaurant: {
        id: restaurantId,
      },
    };

    createMenu(menu);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Menu Name</Form.Label>
            <Form.Control
              type="text"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              placeholder="Enter menu name"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewMenuFormModal;
