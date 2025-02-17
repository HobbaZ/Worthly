import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { EmailRegex } from "../components/EmailRegex";

import Auth from "../utils/auth";

import { Container, Button, Form } from "react-bootstrap";

const signup = () => {
  window.location.replace("/signup");
};

function Login() {
  const [formInput, setFormInput] = useState({ email: "", password: "" });
  const [login, { data }] = useMutation(LOGIN_USER);
  const [validated] = useState(false);

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

    if (!formInput) {
      return false;
    }

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
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
            <Form
              validated={validated}
              onSubmit={submitForm}
              className="mx-auto"
            >
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

              {!EmailRegex.test(formInput.email) && formInput.email !== "" ? (
                <div className="text-center errMessage">
                  {"Invalid email entered"}
                </div>
              ) : (
                ""
              )}

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

              {formInput.password !== "" && formInput.password.length < 8 ? (
                <div className="text-center errMessage">
                  {"Password must be minimum 8 characters"}
                </div>
              ) : (
                ""
              )}

              {infoMessage && (
                <div className="text-center errMessage">{infoMessage}</div>
              )}

              <div className="text-center">
                <Button
                  type="submit"
                  className="btn form-btn col-xs-10 col-sm-12 col-md-8 col-lg-6 col-xl-6 mx-auto my-4  fornLengthButton"
                  disabled={!(formInput.email && formInput.password)}
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
