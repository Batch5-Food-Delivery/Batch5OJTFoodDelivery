import { useCreateRestaurantMutation } from "./restaurantDetailsSlice";
import RestaurantForm from "./RestaurantForm";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const CreateRestaurant = () => {
  const [message, setMessage] = useState();

  const [
    createRestaurant,
    {
      data: resData,
      isSuccess: resUploadSuccess,
      isLoading: resUploading,
      isError: resUploadFailed,
      Error: resError,
      reset: resUploadReset,
    },
  ] = useCreateRestaurantMutation();

  useEffect(() => {
    if (resUploadSuccess) {
      setMessage(
        <Container variant="success">Restaurant is registered</Container>
      );
    } else if (resUploading) {
      setMessage(<Container variant="secondary">Please wait</Container>);
    } else if (resUploadFailed) {
      setMessage(
        <Container variant="danger">
          Something went wrong: {resError?.data?.message || "Unknown error"}
        </Container>
      );
    }
  }, [resUploadSuccess, resUploading, resUploadFailed, resError]);

  const onSubmit = (newRes) => {
    let reqBody = {
      restaurant: {
        name: newRes.name,
        description: newRes.description,
        address: newRes.address,
      },
      image: newRes.profile,
    };
    createRestaurant(reqBody);
  };

  return (
    <Container style={{ "background-color": "rgba(255, 255, 255, 0.9)" }}>
      <h3>Restaurant Application Form</h3>
      {message}
      <RestaurantForm onSubmit={onSubmit}></RestaurantForm>
    </Container>
  );
};

export default CreateRestaurant;
