import React, { useState } from 'react';
//import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { Container, Button} from '../styles/GenericStyles';

import { Form, FormField, Label, FormGroup, FormButton } from '../styles/FormStyle';

import { QUERY_ME } from '../utils/queries';

import { UPDATE_ME, DELETE_ME } from '../utils/mutations'; 

import Auth from '../utils/auth';

function greeting() {

  const date = new Date();
  let currentHour = date.getHours();
  let currentGreeting = '';
  
  if (currentHour >=0 && currentHour < 12) {
    currentGreeting = 'Good Morning';

  } else if (currentHour >= 12 && currentHour < 18 ) {
    currentGreeting = 'Good Afternoon';

  } else {
    currentGreeting = 'Good Evening';
  }
  return currentGreeting
}

function currentDate() {
  let date = new Date();
  let today = `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}`;
  return today;
}

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);

  const [ updateUser ] = useMutation(UPDATE_ME);

  const [ deleteUser ] = useMutation(DELETE_ME);

  const [validated] = useState(false);

    // create state for holding returned user data
    const [newUserData, setNewUserData] = useState([]);

  const userData = data?.me || [];

  const [userUpdateInput, setUpdateUserInput] = useState({ username: `${userData.username}`, email: `${userData.email}`});

  if (!userData) {
    window.location.replace("/login")
  }

  if (loading) {
    return <div>Loading...</div>;
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUpdateUserInput({ ...userUpdateInput, [name]: value });
  };

// create method to search for items and set state on form submit
const handleFormSubmit = async (event) => {
event.preventDefault();

const form = event.currentTarget;
if (form.checkValidity() === false) {
  event.preventDefault();
  event.stopPropagation();
}

try {
  const newData = () => ({
    username: userUpdateInput.username,
    email: userUpdateInput.email,
  })

  setNewUserData(newData)

  setUpdateUserInput({
  //Persist inputs until cleared by user

  username: userUpdateInput.username,
  email: userUpdateInput.email,

  
});
} catch (err) {
  console.error(err);
}
console.log("User details have been saved", userUpdateInput.username, userUpdateInput.email)
};

  const handleUpdateUser = async () => {

    const infoToSave = {...newUserData};

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await updateUser({
        variables: {username: infoToSave.username, email: infoToSave.email },
        
      });

      // if item successfully saves to user's account, save item to state

      console.log('user details have been updated', infoToSave.username, infoToSave.email)
      window.location.replace("/profile");

    } catch (err) {
      console.error(err);
    };
  };

  const handleDeleteUser = async (_id) => {
    // delete user by user id

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await deleteUser({
        variables: { ...userData },
      });
      window.location.replace("/signup");
      console.log('Deleting account...')

    } catch (err) {
      console.error(err);
    };
  };

  return (
    <>
    <Container>
      {Auth.loggedIn() && (
      <div>
        <h2>Your Profile</h2>

        <div>
          <p>{greeting()} {userData.username}, here are your current account details</p>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          </div>

      <Form validated={validated} onSubmit={handleFormSubmit}>
                <h2>Update Your details</h2>
                <FormGroup>
                <Label>Username</Label>
                <FormField
                  type='text'
                  placeholder= {userData.username}
                  name='username'
                  onChange={handleInputChange}
                  minLength={1}
                  value={userUpdateInput.username}>
                  
                </FormField>
                </FormGroup>

                <FormGroup>
                <Label>Email</Label>
                <FormField 
                  type='email'
                  placeholder={userData.email}
                  name='email'
                  onChange={handleInputChange}
                  minLength={1}
                  value={userUpdateInput.email}>
                </FormField>
                </FormGroup>

                <FormGroup>

                <div style={{"textAlign": "center"}}>
                <FormButton
                type='submit'>
                Save Details
                </FormButton>
                </div>

                <div style={{"textAlign": "center"}}>
                <FormButton
                onClick={() => handleUpdateUser()}>
                Update Details
                </FormButton>
                </div>

                
                </FormGroup>

                </Form>

                

                <div style={{"textAlign": "center"}}>
                <FormButton
                style={{ "border" : "2px red solid", "color" : "red"}}
                onClick={() => handleDeleteUser()}>
                Delete Account
                </FormButton>
                </div>
      </div>
      
      )};

    </Container>
    </>
  );
};

export default Profile;
