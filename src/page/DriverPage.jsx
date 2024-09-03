import React, { useEffect, useState } from "react";
import DeliveryList from "../features/delivery/DeliveryList";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCurrentDeliveriesForDriverQuery } from "../features/delivery/DeliverySlice";

const DriverPage = () => {
  const [pageState, setPageState] = useState("currentDeliveries");

  const dispatch = useDispatch();

  const {
    data: currentDeliveries,
    isFetching: fetchingCurrent,
    isSuccess: currentDeliveriesFetched,
    isError: currentDeliveriesFailed,
    error: currentDeliveriesError,
  } = useCurrentDeliveriesForDriverQuery();

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
          <DeliveryList
            deliveries={currentDeliveries}
            loading={fetchingCurrent}
            success={currentDeliveriesFetched}
            failed={currentDeliveriesFailed}
            error={currentDeliveriesError}
            canComplete={true}
          />
        ) : (
          <></>
        )}
      </Container>
    </div>
  );
};

export default DriverPage;
