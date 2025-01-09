import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import {
  useGetRestaurantOrderHistoryQuery,
  useGetRestaurantOrdersQuery,
} from "../features/order/orderSlice";
import OrderList from "../features/order/OrderList";

const RestaurantOrdersPage = () => {
  const { restaurantId } = useParams();
  const [view, setView] = useState("current");

  let currentOrdersQuery = useGetRestaurantOrdersQuery(restaurantId);
  let OrderHistoryQuery = useGetRestaurantOrderHistoryQuery(restaurantId);
  return (
    <Container fluid>
      <Row>
        {/* Left-side vertical navigation */}
        <Col md={2} className="bg-light p-3">
          <ListGroup>
            <ListGroup.Item action onClick={() => setView("current")}>
              Current Orders
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => setView("history")}>
              History
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Right-side order list */}

        <Col>
          <Row className="justify-content-center mb-3">
            <Col
              xs={12}
              sm={10}
              md={8}
              lg={8}
              className="flex-column justify-content-center align-items-center"
            >
              <h2>{view === "current" ? "Current Orders" : "Order History"}</h2>
              {view === "current" ? (
                <OrderList query={currentOrdersQuery} canComplete={true} />
              ) : (
                <OrderList query={OrderHistoryQuery} canComplete={false} />
              )}{" "}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default RestaurantOrdersPage;
