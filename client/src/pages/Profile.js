import React from 'react';
//import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Container } from '../styles/GenericStyles';

import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

function currentDate() {
  let date = new Date();
  let today = date.getHours();
  return today;
}

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || [];

  if (!userData) {
    window.location.replace("/signup")
  }

  if (loading) {
    return <div>Loading...</div>;
  };

  return (
    
    <Container>
      {Auth.loggedIn() && (
      <div>
        <h2>Your Profile</h2>

        <div>
          <p>Hey {userData.username}, here are your current account details</p>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          
        </div>
        </div>
      )}
    </Container>
  );
};

export default Profile;
