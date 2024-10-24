import OrderCard from "./OrderCard";

const OrderList = ({ query, canComplete }) => {
  let content = "";

  if (query.isFetching) {
    content = <p>Your orders are loading...</p>;
  }

  if (query.isError) {
    content = query.Error?.data ? (
      <p>{query.Error.data}</p>
    ) : (
      "Something went wrong"
    );
  }

  if (query.isSuccess) {
    content = query.data.map((order) => (
      <OrderCard order={order} canComplete={canComplete} />
    ));
  }

  return content;
};

export default OrderList;
