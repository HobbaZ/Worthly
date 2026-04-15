import React, { useState } from "react";

import { useMutation } from "@apollo/client";

import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

import { Container, Button, Form } from "react-bootstrap";

import { EmailRegex, isInvalid } from "../components/EmailRegex";
import {
  EmailError,
  PasswordError,
  UsernameError,
} from "../components/ErrorMessages";

function login() {
  window.location.replace("/login");
}

function SignupForm() {
  // set initial form state
  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  // set state for form validation
  const [validated] = useState(false);

  // set mutation at submit event
  const [addUser, { data }] = useMutation(ADD_USER);

  // state for messages
  const [infoMessage, setInfoMessage] = useState("");

  // sets and resets the data variable to whatever you are typing in the textbox
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  };

  //Submits the data from the form to the endpoint
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false || isInvalid(formInput)) {
      event.preventDefault();
      event.stopPropagation();
    }

    //Send data to login endpoint
    try {
      const { data } = await addUser({
        variables: { ...formInput },
      });

      setInfoMessage("Creating your account!");
      Auth.login(data.addUser.token);
      setFormInput("");
    } catch (e) {
      setInfoMessage(e.message);
      console.log("Error creating your account: ", e.message);
    }
  };

  return (
    <Container>
      <div className="main">
        <div className="flex-col">
          <h1 className="text-center">Sign Up</h1>

          {data ? (
            <p className="text-center">Success! Creating your account</p>
          ) : (
            <Form
              validated={validated}
              onSubmit={handleSubmit}
              className="mx-auto"
            >
              <Form.Group className="formGroup col-xs-10 col-sm-12 col-md-6 col-lg-4 col-xl-4 mx-auto">
                <Form.Label>Create a username</Form.Label>
                <Form.Control
                  className="inputField"
                  type="text"
                  name="username"
                  value={formInput.username || ""}
                  placeholder="username"
                  onChange={handleChange}
                  required
                  minLength={2}
                  formNoValidate={true}
                />
              </Form.Group>

              <UsernameError username={formInput.username} />

              <Form.Group className="formGroup col-xs-10 col-sm-12 col-md-6 col-lg-4 col-xl-4 mx-auto">
                <Form.Label>Create a Password</Form.Label>
                <Form.Control
                  className="inputField"
                  type="password"
                  name="password"
                  value={formInput.password || ""}
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  minLength={8}
                />
              </Form.Group>

              <PasswordError password={formInput.password} />

              <Form.Group className="formGroup col-xs-10 col-sm-12 col-md-6 col-lg-4 col-xl-4 mx-auto">
                <Form.Label>Enter your Email</Form.Label>
                <Form.Control
                  className="inputField"
                  type="email"
                  name="email"
                  value={formInput.email || ""}
                  placeholder="Enter email"
                  onChange={handleChange}
                  required
                  minLength={2}
                />
              </Form.Group>

              <EmailError email={formInput.email} />

              {infoMessage && (
                <div className="text-center errMessage">{infoMessage}</div>
              )}

              <div className="text-center">
                <Button
                  type="submit"
                  className="btn form-btn col-xs-10 col-sm-12 col-md-8 col-lg-6 col-xl-6 mx-auto my-4 fornLengthButton"
                  disabled={
                    !(
                      formInput.username &&
                      formInput.email &&
                      formInput.password
                    )
                  }
                >
                  Sign Up
                </Button>
              </div>

              <div className="text-center">
                <Button
                  className="btn form-btn col-xs-10 col-sm-12 col-md-8 col-lg-6 col-xl-6 mx-auto fornLengthButton"
                  onClick={login}
                >
                  login instead
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </Container>
  );
}

export default SignupForm;
