import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

import { ADD_USER } from '../utils/mutations'

import Auth from '../utils/auth';

import { Container, Button, Form} from 'react-bootstrap';

let emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function login() {
  window.location.replace("/login");
};

const SignupForm = () => {

  // set initial form state
  const [formInput, setFormInput] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);

  const [addUser, { data } ] = useMutation(ADD_USER);

    // state for messages
    const [infoMessage, setInfoMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formInput);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...formInput },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      setInfoMessage("Error creating your account: ", e.message)
      console.log("Error creating your account: ",e.message);
    }
  };

  return (
    <>
    <Container>
    <h4 className='text-center'>Sign Up</h4>
      {data ? (
              <p>
                Success! Creating your account...
              </p>
            ) : (
      <Form validated={validated} onSubmit={handleFormSubmit} className='mx-auto col-sm-12 col-md-9 col-lg-6'>

        <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
            placeholder="Your username"
            name="username"
            type="text"
            value={formInput.username}
            onChange={handleInputChange}>
            </Form.Control>
        </Form.Group>

        {formInput.password !== "" && formInput.username.length < 2 ? 
                  <div className="text-center text-danger">{"Username must be minimum 2 characters"}</div> : ''}

        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
            placeholder="Your email"
            name="email"
            type="email"
            value={formInput.email}
            onChange={handleInputChange}>
            </Form.Control>
        </Form.Group>

        {!emailRegex.test(formInput.email) && formInput.email !== null ? 
                  <div className="text-center text-danger">{"Invalid email entered"}</div> : ''}

        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
            placeholder="Create a password"
            name="password"
            type="password"
            value={formInput.password}
            onChange={handleInputChange}>
            </Form.Control>
        </Form.Group>

        {formInput.password !=="" && formInput.password.length < 8 ? 
                  <div className="text-center text-danger">{"Password must be minimum 8 characters"}</div> : ''}

        {infoMessage && (
                <div className='text-center'>{infoMessage}</div>
        )}

        <div className='text-center'>
        <Button
          className='btn btn-dark col-sm-12 col-md-8 col-lg-4 mb-2'
          disabled={!(formInput.username && formInput.email && formInput.password)}
          type="submit">Login</Button>
        </div>

        <div className='text-center'>
        <Button className='btn form-btn col-sm-12 col-md-8 col-lg-4 mb-2'
        onClick={login}>
            Sign Up instead
        </Button>
    </div>
      </Form>
      )}

      </Container>
    </>
  );
};

export default SignupForm;
