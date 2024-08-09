const DriverOrder = ({ order }) => {
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverOrder;
