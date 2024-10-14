function OrderConfirmModal(props) {
  function onOk() {
    props.onOk();
  }
  return (
    <div className="modal">
      <p>Thank You!</p>
      <p>Your Order is delivered</p>
      <button onClick={onOk}>OK</button>
    </div>
  );
}
export default OrderConfirmModal;
