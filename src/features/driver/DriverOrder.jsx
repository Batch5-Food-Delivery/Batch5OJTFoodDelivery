import { useState } from "react";
import { Button } from "react-bootstrap";

const DriverOrder = ({ order }) => {
  const [status, setStatus] = useState(order.status);

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
      <h5 className="card-title mb-0 p-3">Order Id: {order.id}</h5>

      <div className="card-body">
        <div className="row no-gutters">
          <div className="col-md-6">
            <p className="card-text">From:</p>
            <p className="card-text">{order.restaurant.name}</p>
            <p className="card-text">
              {order.restaurant.address.township}:{" "}
              {order.restaurant.address.street}
            </p>
            <p className="card-text">
              {order.restaurant.address.additionalDetail}
            </p>
            <p className="card-text">{order.restaurant.phoneNo}</p>
          </div>
          <div className="col-md-6">
            <p className="card-text">To:</p>
            <p className="card-text">{order.user.name}</p>
            <p className="card-text">
              {order.user.address.township}: {order.user.address.street}
            </p>
            <p className="card-text">{order.user.address.additionalDetail}</p>
            <p className="card-text">{order.user.phoneNo}</p>
            {button}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverOrder;
