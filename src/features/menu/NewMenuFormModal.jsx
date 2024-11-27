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
    <Modal className="fade" show={show} onHide={handleClose} role="dialog">
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
          <div className="d-flex justify-content-end mt-3">
            <Button variant="primary" type="submit">
              Create
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewMenuFormModal;
