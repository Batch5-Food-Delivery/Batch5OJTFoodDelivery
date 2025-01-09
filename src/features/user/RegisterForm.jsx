import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getRegisterStatus, register } from "../auth/authSlice";

const RegisterForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const registerStatus = useSelector(getRegisterStatus);
  const dispatch = useDispatch();

  const onFirstNameInputChange = (e) => {
    setFirstName(e.target.value);
  };
  const onLastNameInputChange = (e) => {
    setLastName(e.target.value);
  };
  const onUserNameInputChange = (e) => {
    setUserName(e.target.value);
  };
  const onEmailInputChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordInputChange = (e) => {
    setPassword(e.target.value);
  };
  const onConfirmPasswordInputChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onRegister = () => {
    let user = {
      firstname: firstName,
      lastname: lastName,
      username: userName,
      email,
      password,
    };
    dispatch(register(user));
    console.log(user);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onRegister();
  };

  return (
    <Form
      className={props.className}
      onAnimationEnd={props.onAnimationEnd}
      onSubmit={onSubmit}
    >
      {registerStatus === "failed" && (
        <Form.Text className="text-danger">Registration failed</Form.Text>
      )}
      {registerStatus === "success" && (
        <Form.Text className="text-success">
          Registration success! You can now log in
        </Form.Text>
      )}
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={onFirstNameInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={onLastNameInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicUserName">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          value={userName}
          onChange={onUserNameInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={onEmailInputChange}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Repeat your Password"
          value={confirmPassword}
          onChange={onConfirmPasswordInputChange}
        />
        {password !== confirmPassword && confirmPassword !== "" && (
          <Form.Text id="passwordHelpBlock" muted>
            <div style={{ color: "red" }}>Passwords do not match!</div>
          </Form.Text>
        )}
      </Form.Group>

      <Button style={{ width: "100%" }} variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default RegisterForm;
