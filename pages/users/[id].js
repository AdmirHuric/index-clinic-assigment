import React, {useState} from "react";
import {Row, Form, Button} from "react-bootstrap";
import Title from "../../components/Title";
import Logout from "../../components/Logout";
import { toast } from "react-toastify";
import Router from "next/router";

function User({fetchedUser}) {
  const [user, setUser] = useState(fetchedUser);
  const [validated, setValidated] = useState(true);

  const onSubmit = async (e) => {
    e.preventDefault();
    const req = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await req.json();

    if (data) {
      toast.success("Successfully edited user.");
      Router.push("/users");
    } else {
      setValidated(false);
      toast.error("Could not edit user.");
    }
  };

  const onUsernameChange = (e) => {
    setUser({...user, username: e.target.value});
  };

  const onNameChange = (e) => {
    setUser({...user, name: e.target.value});
  };

  const onEmailChange = (e) => {
    setUser({...user, email: e.target.value});
  };

  return (
    <>
    <Logout/>
    <Title title="Edit User"/>
    <Row className="justify-content-center align-self-center">
      <Form
        noValidate
        validated={validated}
        onSubmit={onSubmit}
        className="py-5 px-5 mx-2 text-center col-sm-12 col-md-6 border">
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            value={user.name}
            onChange={onNameChange}
            placeholder="Enter name" />
          <Form.Control.Feedback type="invalid">
            Please choose a name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="username"
            value={user.username}
            onChange={onUsernameChange}
            placeholder="Enter username" />
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            value={user.email}
            onChange={onEmailChange}
            placeholder="Email" />
          <Form.Control.Feedback type="invalid">
            Please choose a email.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={user.username.length === 0 || user.name.length === 0 || user.email.length === 0}>
          Submit
        </Button>
      </Form>
    </Row>

    </>
  );
}

export async function getServerSideProps({params}) {
  const request = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
  const data = await request.json();
  return {props: {fetchedUser: data}};
}

export default User;
