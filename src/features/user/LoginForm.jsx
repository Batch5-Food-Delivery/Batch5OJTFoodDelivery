import { Form, Button } from "react-bootstrap";
import { getLoginStatus, login } from "../auth/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiSlice } from "../api/ApiSlice";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginStatus = useSelector(getLoginStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onEmailInputChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordInputChange = (e) => {
    setPassword(e.target.value);
  };

  const onLogin = (email, password) => {
    dispatch(
      login({
        username: email,
        password: password,
      })
    );
    dispatch(apiSlice.util.resetApiState());
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password);
  };

  useEffect(() => {
    if (loginStatus === "success") {
      navigate("/");
    }
  }, [loginStatus, navigate]);

  return (
    <Form
      className={props.className}
      onAnimationEnd={props.onAnimationEnd}
      onSubmit={onSubmit}
    >
      {loginStatus === "failed" && (
        <Form.Text className="text-danger">
          Login failed. Incorrect username or password
        </Form.Text>
      )}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={onEmailInputChange}
          type="text"
          placeholder="Enter email"
          value={email}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={onPasswordInputChange}
          type="password"
          placeholder="Password"
          value={password}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button style={{ width: "100%" }} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default LoginForm;
