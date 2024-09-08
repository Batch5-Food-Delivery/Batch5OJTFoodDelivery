import { Alert } from "react-bootstrap";
import Delivery from "./Delivery";

const DeliveryList = ({ query, canComplete }) => {
  let content = "";

  if (query.isFetching) {
    content = <p>Your deliveries are loading...</p>;
  }

  if (query.isError) {
    content = <p>There is an error</p>;
  }

  if (query.isSuccess) {
    content = query.data.map((delivery) => (
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
