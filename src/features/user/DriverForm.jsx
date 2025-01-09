import { Button, Col, Container, Row } from "react-bootstrap";
import classes from "./driverForm.module.css";
import { useApplyDriverMutation } from "./driverSlice";
import { useSelector, useDispatch } from "react-redux";
import { getRoles, setRoles } from "../auth/authSlice";

const DriverForm = () => {
  const dispatch = useDispatch();
  const roles = useSelector(getRoles);
  const [applyDriver, { data: driver, isSuccess, isError }] =
    useApplyDriverMutation();
  let message = <></>;

  if (roles.includes("ROLE_DRIVER")) {
    message = (
      <Container className={`bg-success ${classes.messagebox}`}>
        Congratulations!! You have become a driver for Dreamland Food Delivery
        Service
      </Container>
    );
  }

  if (isError) {
    message = (
      <Container className="container danger">Something went wrong!</Container>
    );
  }

  if (isSuccess) {
    dispatch(setRoles(driver.roles));
  }

  const onSubmit = () => {
    applyDriver();
  };

  return (
    <>
      <Container className={classes.banner}>
        <h2>Become a driver</h2>
      </Container>
      {message}
      <Container className={classes.job_description} fluid>
        <h3>
          <b>Apply Today!</b>
        </h3>
        <h4>We Are Hiring Food Delivery Drivers</h4>
        What We Offer:
        <div>
          <Row>
            <Col lg={6}>
              <ul className={classes.job_requirements}>
                <li>Competitive pay and bonuses.</li>
                <li>Flexible working hours to fit your schedule.</li>
                <li>Opportunities for career growth.</li>
                <li>A fun, fast-paced work environment.</li>
              </ul>
            </Col>
            <Col lg={6}>
              Requirements:
              <ul className={classes.job_requirements}>
                <li>A valid driver’s license and reliable vehicle.</li>
                <li>A smartphone with internet access.</li>
                <li>Friendly attitude and strong time-management skills.</li>
              </ul>
            </Col>
          </Row>
        </div>
      </Container>
      <Container style={{ "margin-top": "15px" }}>
        <Row>
          <Col sm={10}></Col>
          <Col sm={2}>
            {!roles.includes("ROLE_DRIVER") && (
              <Button onClick={() => onSubmit()}>Apply</Button>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DriverForm;
