import { Button, Col, Container, Row, ButtonGroup } from "react-bootstrap";
import LoginForm from "./LoginForm";
import classes from "./form.module.css";
import RegisterForm from "./RegisterForm";
import { useState } from "react";

const Form = () => {
  const [state, setState] = useState("login");

  const [formState, setFormState] = useState({
    class: classes.form_container,
    onAnimationEnd: () => {},
  });

  const changeState = (nextState) => {
    setFormState({
      class: classes.form_container_fade,
      onAnimationEnd: () => {
        setState(nextState);
        setFormState({
          class: classes.form_container,
          onAnimationEnd: () => {},
        });
      },
    });
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs="6" on>
          <h1 className={classes.heading}>Food Delivery</h1>
          <Row className={classes.form_background}>
            <div
              className={formState.class}
              onAnimationEnd={formState.onAnimationEnd}
            >
              <LoginForm
                className={
                  state !== "login" ? classes.form_hidden : classes.form
                }
              />
              <RegisterForm
                className={
                  state !== "register" ? classes.form_hidden : classes.form
                }
              />
            </div>
          </Row>
          <Row style={{ padding: "1rem" }}>
            <ButtonGroup aria-label="Basic example">
              <Button onClick={() => changeState("login")} variant="secondary">
                Login
              </Button>
              <Button
                onClick={() => changeState("register")}
                variant="secondary"
              >
                Register
              </Button>
            </ButtonGroup>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Form;
