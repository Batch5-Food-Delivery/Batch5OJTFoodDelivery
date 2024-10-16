import { Card } from "react-bootstrap";

const AddressCard = ({ address, selected, onClick }) => {
  return (
    <Card
      style={{ width: "14rem" }}
      onClick={onClick}
      border={selected && "primary"}
    >
      <Card.Body>
        <Card.Title>{address.township}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {address.street}
        </Card.Subtitle>
        <Card.Text>{address.additionalDetails}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default AddressCard;
