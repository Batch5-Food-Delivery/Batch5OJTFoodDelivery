import React, { useState } from "react";
import DeliveryList from "../features/delivery/DeliveryList";
import { useSelector, useDispatch } from "react-redux";
import { getUser, setAvailable } from "../features/auth/authSlice";

import {
  Button,
  ButtonGroup,
  Container,
  Row,
  Col,
  Card,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  useCompletedDeliveriesForDriverQuery,
  useCurrentDeliveriesForDriverQuery,
} from "../features/delivery/DeliverySlice";
import { useSwitchAvailableMutation } from "../features/user/driverSlice";

const DriverPage = () => {
  const dispatch = useDispatch();
  const [pageState, setPageState] = useState("currentDeliveries");

  const available = useSelector(getUser).available;

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

  const [switchAvailable, { data: returnedStatus, isLoading, isSuccess }] =
    useSwitchAvailableMutation();

  if (isSuccess) {
    dispatch(setAvailable(returnedStatus));
  }

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
      <Container fluid>
        <Row className="p-3">
          <Col lg={3}>
            <Card className="text-center p-0 m-0">
              <Card.Header>Status</Card.Header>
              <Card.Body>
                <Card.Title>
                  {available ? "Available" : "Unavailable"}
                </Card.Title>
                <Card.Text>
                  {" "}
                  {available
                    ? "Wanna take a break? Switch this off"
                    : "You can turn on the switch when you're ready to take deliveries"}
                </Card.Text>
                <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch"
                  checked={available}
                  style={{
                    transform: "scale(1.5)",
                    margin: "0 auto", // Center horizontally
                    display: "block", // Ensure it respects `margin: auto`
                  }}
                  onClick={() => switchAvailable(!available)}
                />
              </Card.Body>
              <Card.Footer className="text-muted">
                {isLoading && "Please wait"}
              </Card.Footer>
            </Card>
          </Col>
          <Col lg={9}>
            {pageState === "currentDeliveries" ? (
              <DeliveryList query={currentDeliveries} canComplete={true} />
            ) : (
              <DeliveryList query={completedDeliveries} canComplete={false} />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DriverPage;
