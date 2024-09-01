import { useState } from "react";
import { Button } from "react-bootstrap";

const DriverOrder = ({ delivery }) => {
  const [status, setStatus] = useState(delivery.status);

  let button = "";

  if (status === "delivering") {
    button = <Button varient="primary">Complete</Button>;
  }
  if (status === "loading") {
    button = (
      <Button varient="secondary" disabled>
        Loading
      </Button>
    );
  }
  if (status === "completed") {
    button = (
      <Button varient="success" disabled>
        Completed
      </Button>
    );
  }

  return (
    <div className="card mb-3 rounded border-3">
      <h5 className="card-title mb-0 p-3">Order Id: {delivery.id}</h5>

      <div className="card-body">
        <div className="row no-gutters">
          <div className="col-md-6">
            <p className="card-text">From:</p>
            <p className="card-text">{delivery.restaurant.name}</p>
            <p className="card-text">
              {delivery.restaurantAddress.township}:{" "}
              {delivery.restaurantAddress.street}
            </p>
            <p className="card-text">
              {delivery.restaurantAddress.additionalDetails}
            </p>
          </div>
          <div className="col-md-6">
            <p className="card-text">To:</p>
            <p className="card-text">{delivery.customer.name}</p>
            <p className="card-text">
              {delivery.destination.township}: {delivery.destination.street}
            </p>
            <p className="card-text">
              {delivery.destination.additionalDetails}
            </p>
            {button}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverOrder;
