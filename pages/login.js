import React, { useState } from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import PropsTypes from 'prop-types';
import Router from 'next/router';
import Title from '../components/Title';

function Login({defaultUsername, defaultPassword}) {
  const [username, setUsername] = useState(defaultUsername);
  const [password, setPassword] = useState(defaultPassword);
  const [validated, setValidated] = useState(true);


  const onUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

  };

  const onPasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      setValidated(true);
      const req = await fetch('http://localhost:3000/api/login', {method: 'POST', body: JSON.stringify({username, password})});
      const { loggedIn } = await req.json();
      if (loggedIn) {
        Router.push("/");
      }
    }
    else {
      setValidated(false);
    }
  };

  return (
    <>
    <Title title="Index Clinic Login"/>
      <Row className="justify-content-center align-self-center">
      <Form
        noValidate
        validated={validated}
        onSubmit={onSubmit}
        className="py-5 px-5 mx-2 text-center col-sm-12 col-md-6 border">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="username"
            value={username}
            onChange={onUsernameChange}
            placeholder="Enter username" />
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Password" />
          <Form.Control.Feedback type="invalid">
            Please choose a password.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={username.length === 0 || password.length === 0}>
          Submit
        </Button>
      </Form>
      </Row>
    </>
  )

}

export async function getStaticProps() {
  return {
    props: {defaultUsername: "testUsername", defaultPassword: "testPassword"}
  }
}

Login.propsTypes = {
  username: PropsTypes.string.isRequired,
  password: PropsTypes.string.isRequired
};

export default Login;
