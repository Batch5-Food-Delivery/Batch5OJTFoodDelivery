import React, { useState } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { useDeleteFoodMutation } from "../menu/menuSlice";

const DeleteFoodModal = ({ show, handleClose, food }) => {
  const [deleteFood, { isSuccess, isLoading, isError, reset, error }] =
    useDeleteFoodMutation();

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
        <Container className="container-danger">Deleting Food Item</Container>
      </>
    );
  }
  if (isSuccess) {
    reset();
    handleClose();
  }

  const handleDelete = () => {
    deleteFood(food);
  };

  return (
    <Modal className="fade" show={show} onHide={handleClose} role="dialog">
      <Modal.Header style={{ "background-color": "red" }} closeButton>
        <Modal.Title>Delete Food</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message}
        <p>Are you sure you want to delete {food?.name}?</p>
        <Button onClick={() => handleDelete()}>Delete</Button>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteFoodModal;
