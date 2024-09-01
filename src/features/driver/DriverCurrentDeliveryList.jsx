import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCurrentDeliveries,
  getAllCurrentDeliveries,
  getCurrentDeliveryError,
  getCurrentDeliveryStatus,
} from "./driverSlice";
import DriverDelivery from "./DriverDelivery";
import { useEffect } from "react";

const DriverCurrentDeliveryList = () => {
  const deliveries = useSelector(getAllCurrentDeliveries);
  const status = useSelector(getCurrentDeliveryStatus);
  const error = useSelector(getCurrentDeliveryError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllCurrentDeliveries());
    }
  }, [status, dispatch]);

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
      <DriverDelivery delivery={delivery} key={delivery.id} />
    ));
  }

  return content;
};

export default DriverCurrentDeliveryList;
