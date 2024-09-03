import Delivery from "./Delivery";

const DeliveryList = ({
  deliveries,
  loading,
  success,
  failed,
  error,
  canComplete,
}) => {
  let content = "";

  if (loading) {
    content = <p>Your deliveries are loading...</p>;
  }

  if (failed) {
    content = <p>{error}</p>;
  }

  if (success) {
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
