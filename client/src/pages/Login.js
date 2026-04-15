import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { isInvalid } from "../components/EmailRegex";
import { EmailError, PasswordError } from "../components/ErrorMessages";

import Auth from "../utils/auth";

import { Container, Button, Form } from "react-bootstrap";

const signup = () => {
  window.location.replace("/signup");
};

function Login() {
  const [formInput, setFormInput] = useState({ email: "", password: "" });
  const [login, { data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  function inputChange(event) {
    const { name, value } = event.target;

    setFormInput({
      ...formInput,
      [name]: value,
    });
  }

  // state for messages
  const [infoMessage, setInfoMessage] = useState("");

  // submit form
  const submitForm = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false || isInvalid(formInput)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    //Send data to login endpoint
    try {
      const { data } = await login({
        variables: { ...formInput },
      });

      setInfoMessage("Logging in!");
      Auth.login(data.login.token);
    } catch (e) {
      setInfoMessage("Incorrect password or email address entered!");
      console.error("Incorrect password or email address entered", e);
    }
  };

  return (
    <Container>
      <div className="main">
        <div className="flex-col">
          <h1 className="text-center">Login</h1>
          {data ? (
            <p className="text-center">Success! Logging you in</p>
          ) : (
            <Form onSubmit={submitForm} className="mx-auto">
              <Form.Group className="formGroup col-xs-10 col-sm-12 col-md-6 col-lg-4 col-xl-6 mx-auto">
                <Form.Label> Email address</Form.Label>
                <Form.Control
                  className="inputField"
                  type="email"
                  name="email"
                  value={formInput.email || ""}
                  placeholder="Enter email"
                  onChange={inputChange}
                  required
                />
              </Form.Group>

              <EmailError email={formInput.email} />

              <Form.Group className="formGroup col-xs-10 col-sm-12 col-md-6 col-lg-4 col-xl-6 mx-auto">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="inputField"
                  type="password"
                  name="password"
                  value={formInput.password || ""}
                  placeholder="Password"
                  onChange={inputChange}
                  required
                />
              </Form.Group>

              <PasswordError password={formInput.password} />

              {infoMessage && (
                <div className="text-center errMessage">{infoMessage}</div>
              )}

              <div className="text-center">
                <Button
                  type="submit"
                  className="btn form-btn col-xs-10 col-sm-12 col-md-8 col-lg-6 col-xl-6 mx-auto my-4  fornLengthButton"
                  disabled={isInvalid(formInput)}
                >
                  Login
                </Button>
              </div>

              <div className="text-center">
                <Button
                  className="btn form-btn col-xs-10 col-sm-12 col-md-8 col-lg-6 col-xl-6 mx-auto fornLengthButton"
                  onClick={signup}
                >
                  Sign Up instead
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Login;
