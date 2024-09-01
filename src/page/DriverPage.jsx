import React, { useState } from "react";
import DriverCurrentDeliveryList from "../features/driver/DriverCurrentDeliveryList";
import { Button, ButtonGroup, Container } from "react-bootstrap";

const DriverPage = () => {
  const [pageState, setPageState] = useState("currentDeliveries");

  return (
    <div className="d-flex flex-column align-items-center w-100 mt-3">
      <ButtonGroup className="w-50">
        <Button
          variant={pageState === "currentDeliveries" ? "primary" : "secondary"}
          onClick={() => setPageState("currentDeliveries")}
        >
          Current
        </Button>
        <Button
          variant={
            pageState === "completedDeliveries" ? "primary" : "secondary"
          }
          onClick={() => setPageState("completedDeliveries")}
        >
          Completed
        </Button>
      </ButtonGroup>
      <Container className="p-3 w-100">
        <DriverCurrentDeliveryList />
      </Container>
    </div>
  );
};

export default DriverPage;
