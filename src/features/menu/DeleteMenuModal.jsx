import React, { useState } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { useDeleteMenuMutation } from "./menuSlice";

const DeleteMenuModal = ({ show, handleClose, menu }) => {
  const [deleteMenu, { isError, isLoading, isSuccess, error, reset }] =
    useDeleteMenuMutation();

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
  }

  const handleDelete = () => {
    deleteMenu(menu);
  };

  return (
    <Modal className="fade" show={show} onHide={handleClose} role="dialog">
      <Modal.Header style={{ "background-color": "red" }} closeButton>
        <Modal.Title>Delete Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message}
        <p>Are you sure?</p>
        <Button onClick={() => handleDelete()}>Delete</Button>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteMenuModal;
