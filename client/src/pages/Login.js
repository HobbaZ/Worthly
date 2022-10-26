import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import { Container, Button, Form} from 'react-bootstrap';

const signup = () => {
  window.location.replace("/signup");
}

let emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Login = () => {

  const [formInput, setFormInput] = useState({ email: '', password: '' });
  const [login, { data }] = useMutation(LOGIN_USER);
  const [validated] = useState(false);

  // update state based on form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormInput({
      ...formInput, [name]: value,
    });
  };

    // state for messages
    const [infoMessage, setInfoMessage] = useState('');

  // submit form
  const handleFormSubmit = async (event) => {
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

      setInfoMessage('Logging in!')
      Auth.login(data.login.token);
    } catch (e) {
      setInfoMessage("Incorrect password or email address entered!")
      console.error("Incorrect password or email address entered",e);
    }

    // clear form values
    setFormInput({
      email: '',
      password: '',
    });
  };

  return (
    <Container>
          <h4 className='text-center'>Login</h4>
            {data ? (
              <p className='text-center'>
                Success! Logging you in
              </p>
            ) : (
              <Form validated={validated} onSubmit={handleFormSubmit} className='mx-auto col-sm-12 col-md-9 col-lg-6'>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formInput.email || ""}
                  required
                  onChange={handleInputChange}>
                  </Form.Control>
                  </Form.Group>

                  {!emailRegex.test(formInput.email) && formInput.email !== "" ? 
                  <div className="text-center text-danger">{"Invalid email entered"}</div> : ''}

                  <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formInput.password || ""}
                  required
                  onChange={handleInputChange}>
                  </Form.Control>
                  </Form.Group>

                  {formInput.password !== "" && formInput.password.length < 8 ? 
                  <div className="text-center text-danger">{"Password must be a minimum of 8 characters"}</div> : ''}

                  {infoMessage && (
                  <div className='text-center'>{infoMessage}</div>
                  )}
                  
                  <div className='text-center'>
                  <Button className='btn btn-dark col-sm-12 col-md-8 col-lg-4 mb-2'
                  disabled={!(formInput.email && formInput.password)}
                  type="submit">Login</Button>
                  </div>

                  <div className='text-center'>
                  <Button className='btn form-btn col-sm-12 col-md-8 col-lg-4 mb-2'
                  onClick={signup}>
                      Sign Up instead
                  </Button>
                  </div>
              </Form>
            )}
    </Container>
  );
};

export default Login;
