import React from "react";
import { ListGroup, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RestaurantSearchResults = ({ query }) => {
  const { data: restaurants, isLoading, isError, error } = query;
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message || "Something went wrong!"}</p>;

  return (
    <ListGroup>
      {restaurants?.map((restaurant) => (
        <ListGroup.Item
          key={restaurant.id}
          className="d-flex align-items-center"
          onClick={() => navigate(`/restaurant/${restaurant.id}`)}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={
              restaurant.profile
                ? `http://localhost:8686/restaurant/image/${restaurant.profile}`
                : "https://placehold.co/100x100?text=No+Image"
            }
            alt={restaurant.name}
            rounded
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              marginRight: "15px",
            }}
          />
          <div>
            <p>
              <b>{restaurant.name}</b>
            </p>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default RestaurantSearchResults;
