import React, { useEffect, useState } from "react";
import DeliveryList from "../features/delivery/DeliveryList";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCompletedDeliveriesForDriver,
  fetchAllCurrentDeliveriesForDriver,
  getAllCompletedDeliveries,
  getAllCurrentDeliveries,
  getCurrentDeliveryError,
  getCurrentDeliveryStatus,
} from "../features/delivery/DeliverySlice";
import { Link } from "react-router-dom";

const DriverPage = () => {
  const [pageState, setPageState] = useState("currentDeliveries");

  const currentDeliveries = useSelector(getAllCurrentDeliveries);
  const completedDeliveries = useSelector(getAllCompletedDeliveries);
  const status = useSelector(getCurrentDeliveryStatus);
  const error = useSelector(getCurrentDeliveryError);

  const dispatch = useDispatch();

  useEffect(() => {
    //if (status === "idle") {
    dispatch(fetchAllCurrentDeliveriesForDriver());
    dispatch(fetchAllCompletedDeliveriesForDriver());
    //}
  }, [/*status,*/ dispatch]);

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
            status={status}
            error={error}
            canComplete={true}
          />
        ) : (
          <DeliveryList
            deliveries={completedDeliveries}
            status={status}
            error={error}
            canComplete={false}
          />
        )}
      </Container>
    </div>
  );
};

export default DriverPage;
