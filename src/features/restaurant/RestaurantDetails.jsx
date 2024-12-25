import { Row, Col } from "react-bootstrap";

const RestaurantDetails = ({ restaurant }) => {
  let picture = `http://localhost:8686/restaurant/image/${restaurant?.profile}`;
  return (
    <Row
      className="mt-3 align-items-center"
      style={{
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <Col md={3}>
        <div>
          <img
            src={picture}
            alt="Mont Zay Tan (MICT) vendor logo"
            style={{
              "max-height": "300px",
              "overflow-y": "hidden",
              width: "100%",
            }}
          />
        </div>
      </Col>
      <Col md={9}>
        {/*
          <ul className="main-info__characteristics">
            <li>Italian</li>
            <li>Pizza</li>
            <li>Chinese</li>
            <li>Asian</li>
            <li>Thai</li>
          </ul>
          */}
        <h2>{restaurant.name}</h2>

        <div className="main-info__meta-information">
          <p>{restaurant.description}</p>
        </div>
        <br></br>
        <div>
          <p>
            {restaurant.address.township}, {restaurant.address.street}
          </p>

          <p>{restaurant.address.additionalDetails}</p>
        </div>
      </Col>
    </Row>
  );
};

export default RestaurantDetails;
