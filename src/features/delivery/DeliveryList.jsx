import Delivery from "./Delivery";

const DeliveryList = ({ deliveries, status, error, canComplete }) => {
  let content = "";

  if (status === "loading") {
    content = <p>Your deliveries are loading...</p>;
  }

  if (status === "idle") {
    content = <p>You have no deliveries yet...</p>;
  }

  if (status === "failed") {
    content = <p>{error}</p>;
  }

  if (status === "success") {
    content = deliveries.map((delivery) => (
      <Delivery
        delivery={delivery}
        key={delivery.id}
        canComplete={canComplete}
      />
    ));
  }

  return content;
};

export default DeliveryList;
