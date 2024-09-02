import React, { useEffect, useState } from "react";
import DeliveryList from "../features/delivery/DeliveryList";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCurrentDeliveriesForDriver,
  getAllCurrentDeliveriesForDriver,
  getCurrentDeliveryError,
  getCurrentDeliveryStatusForDriver,
} from "../features/delivery/DeliverySlice";

const DriverPage = () => {
  const [pageState, setPageState] = useState("currentDeliveries");

  const deliveries = useSelector(getAllCurrentDeliveriesForDriver);
  const status = useSelector(getCurrentDeliveryStatusForDriver);
  const error = useSelector(getCurrentDeliveryError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllCurrentDeliveriesForDriver());
    }
  }, [status, dispatch]);

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
        <DeliveryList
          deliveries={deliveries}
          status={status}
          error={error}
          canComplete={true}
        />
      </Container>
    </div>
  );
};

export default DriverPage;
