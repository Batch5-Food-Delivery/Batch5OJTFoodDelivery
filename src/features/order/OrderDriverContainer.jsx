import { useState } from "react";
import { Container, Card, ListGroup, Row, Col, Button } from "react-bootstrap";
import {
  useGetAvailableDriversQuery,
  useCompleteOrderMutation,
} from "./orderSlice";

const OrderDriverContainer = ({ orderId }) => {
  const { data: drivers, isSuccess: fetchDriversSuccess } =
    useGetAvailableDriversQuery();
  const [selectedDriverId, setSelectedDriverId] = useState(-1);

  const [
    completeOrder,
    {
      isSuccess: completeOrderSuccess,
      isError: completeOrderError,
      isLoading: completeOrderLoading,
    },
  ] = useCompleteOrderMutation();

  const onConfirm = () => {
    completeOrder({
      orderId,
      driverId: selectedDriverId,
    });
  };

  return (
    <Container className="my-3">
      <h5>Available Drivers</h5>
      <p className="text-muted">Select a driver from the list below:</p>

      {fetchDriversSuccess && drivers.length > 0 ? (
        <ListGroup>
          {drivers.map((driver) => (
            <ListGroup.Item
              key={driver.id}
              onClick={() => setSelectedDriverId(driver.id)}
              active={selectedDriverId === driver.id}
              className="driver-item p-2"
              style={{ cursor: "pointer" }}
            >
              <Card.Text as="h5" className="mb-0">
                {driver.firstname} {driver.lastname}
              </Card.Text>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No drivers available</p>
      )}
      <Row className="mt-3">
        <Col className="d-flex flex-column align-items-end">
          {selectedDriverId === -1 ? (
            <Button variant="secondary" disabled>
              Confirm
            </Button>
          ) : (
            <Button variant="primary" onClick={() => onConfirm()}>
              Confirm
            </Button>
          )}
          <br />
          <div className="mt-2">
            {completeOrderError && (
              <Card.Text as="h5" className="mb-0 text-danger">
                {Error.data ? Error.data : "Something went wrong"}
              </Card.Text>
            )}

            {completeOrderLoading && (
              <Card.Text as="h5" className="mb-0 text-primary">
                Loading...
              </Card.Text>
            )}

            {completeOrderSuccess && (
              <Card.Text as="h5" className="mb-0 text-success">
                Success
              </Card.Text>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDriverContainer;
