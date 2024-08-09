const DriverOrder = ({ order }) => {
  return (
    <div class="card mb-3" style="max-width: 540px;">
      <h5 class="card-title">{order.id}</h5>

      <div class="card-body">
        <div class="row no-gutters">
          <div class="col-md-6">
            <p class="card-text">{order.restaurant.name}</p>
            <p class="card-text">
              {order.restaurant.address.township}:{" "}
              {order.restaurant.address.street}
            </p>
            <p class="card-text">{order.restaurant.address.additionalDetail}</p>
            <p class="card-text">{order.restaurant.phoneNo}</p>
          </div>
          <div class="col-md-6">
            <p class="card-text">{order.user.name}</p>
            <p class="card-text">
              {order.user.address.township}: {order.user.address.street}
            </p>
            <p class="card-text">{order.user.address.additionalDetail}</p>
            <p class="card-text">{order.user.phoneNo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
