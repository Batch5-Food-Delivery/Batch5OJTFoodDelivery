import React, { useState } from "react";
import DeliveryList from "../features/delivery/DeliveryList";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  useCompletedDeliveriesForDriverQuery,
  useCurrentDeliveriesForDriverQuery,
} from "../features/delivery/DeliverySlice";

const DriverPage = () => {
  const [pageState, setPageState] = useState("currentDeliveries");

  /*const {
    data: currentDeliveries,
    isFetching: fetchingCurrent,
    isSuccess: currentDeliveriesFetched,
    isError: currentDeliveriesFailed,
    error: currentDeliveriesError,
  } = useCurrentDeliveriesForDriverQuery();
  */

  const currentDeliveries = useCurrentDeliveriesForDriverQuery();
  const completedDeliveries = useCompletedDeliveriesForDriverQuery();

  return (
    <div className="d-flex flex-column align-items-center w-100 mt-3">
      <Link to="/" className="text-warning">
        Back
      </Link>
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
        {pageState === "currentDeliveries" ? (
          <DeliveryList query={currentDeliveries} canComplete={true} />
        ) : (
          <DeliveryList query={completedDeliveries} canComplete={false} />
        )}
      </Container>
    </div>
  );
};

export default DriverPage;
