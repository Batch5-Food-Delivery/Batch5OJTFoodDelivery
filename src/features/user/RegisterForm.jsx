import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';


const RegisterForm = (props) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFirstNameInputChange = (e) => { setFirstName(e.target.value) }
  const onLastNameInputChange = (e) => { setLastName(e.target.value) }
  const onUserNameInputChange = (e) => { setUserName(e.target.value) }
  const onEmailInputChange = (e) => { setEmail(e.target.value) }
  const onPasswordInputChange = (e) => { setPassword(e.target.value) }

    return (
        <Form className={props.className} onAnimationEnd={props.onAnimationEnd}> 

          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="First Name"
              value={firstName}
              onChange={onFirstNameInputChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Last Name"
              value={lastName}
              onChange={onLastNameInputChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Username"
              value={userName}
              onChange={onUserNameInputChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email"
              value={email}
              onChange={onEmailInputChange} />
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
              onChange={onPasswordInputChange} />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
    )
}

export default RegisterForm;