import React, { useState } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { useUpdateMenuMutation } from "./menuSlice";

const EditMenuFormModal = ({ show, handleClose, menu }) => {
  const [menuName, setMenuName] = useState(menu.name);

  const [updateMenu, { isError, isLoading, isSuccess, error, reset }] =
    useUpdateMenuMutation();

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
        <Container className="container-danger">"Updating Menu"</Container>
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

    let updatedMenu = {
      ...menu,
      name: menuName,
    };

    updateMenu(updatedMenu);
  };

  return (
    <Modal className="fade" show={show} onHide={handleClose} role="dialog">
      <Modal.Header
        style={{ "background-color": "rgb(245, 189, 7)" }}
        closeButton
      >
        <Modal.Title>Edit Menu</Modal.Title>
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

export default EditMenuFormModal;
