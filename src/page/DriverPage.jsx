import React, { useState } from "react";
import DriverCurrentOrderList from "../features/driver/DriverCurrentOrderList";
import { Button, ButtonGroup, Container } from "react-bootstrap";

const DriverPage = () => {
  const [pageState, setPageState] = useState("currentOrders");

  return (
    <div className="d-flex flex-column align-items-center w-100 mt-3">
      <ButtonGroup className="w-50">
        <Button
          variant={pageState === "currentOrders" ? "primary" : "secondary"}
          onClick={() => setPageState("currentOrders")}
        >
          Current
        </Button>
        <Button
          variant={pageState === "completedOrders" ? "primary" : "secondary"}
          onClick={() => setPageState("completedOrders")}
        >
          Completed
        </Button>
      </ButtonGroup>
      <Container className="p-3 w-100">
        <DriverCurrentOrderList />
      </Container>
    </div>
  );
};

export default DriverPage;
