import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCurrentOrders,
  getAllCurrentOrders,
  getCurrentOrderError,
  getCurrentOrderStatus,
} from "./driverSlice";
import DriverOrder from "./DriverOrder";
import { useEffect } from "react";

const DriverCurrentOrderList = () => {
  const orders = useSelector(getAllCurrentOrders);
  const status = useSelector(getCurrentOrderStatus);
  const error = useSelector(getCurrentOrderError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllCurrentOrders());
    }
  }, [status, dispatch]);

  let content = "";

  if (status === "loading") {
    content = <p>Your orders are loading...</p>;
  }

  if (status === "idle") {
    content = <p>You have no orders yet...</p>;
  }

  if (status === "failed") {
    content = <p>{error}</p>;
  }

  if (status === "success") {
    content = orders.map((order) => (
      <DriverOrder order={order} key={order.id} />
    ));
  }

  return content;
};

export default DriverCurrentOrderList;
