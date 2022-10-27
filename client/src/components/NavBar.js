import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Button} from 'react-bootstrap';

import Auth from '../utils/auth';

const AppNavbar = () => {

  return (
    <Nav className="navbar navbar-expand-lg navbar-light">
    <Container fluid>
    <Navbar.Brand as={Link} className="text-white ml-3 navLink" to='/'>Worthly</Navbar.Brand>

      {/*Navbar collapse and expand */}
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navBarResponsive" aria-controls="navBarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navBarResponsive">

      <Nav className="navbar-nav ml-auto mb-2 mb-lg-0">

        <NavLink as={Link} className="ml-3 my-2 navLink" to='/' style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white'})}>Home</NavLink>

        <NavLink as={Link} className="ml-3 my-2 navLink" to='/search' style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white'})}>Search</NavLink>

        {/*Only show if user logged in*/}
        {Auth.loggedIn() ? ( 
            <>
            <NavLink as={Link} className="ml-3 my-2 navLink" to='/saved' style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white'})}>Saved Searches</NavLink>

            <NavLink as={Link} className="ml-3 my-2 navLink" to='/profile' style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white'})}>Your Profile</NavLink>

            <Button className ='btn btn-dark ml-3 col-3 col-sm-2 col-lg-auto' onClick={Auth.logout}> Logout</Button>
          </>
           ) : (
             <>
             {/*Show if user not logged in*/}
            <NavLink className="ml-3 my-2 navLink" as={Link} to='/login' style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white'})}> Login</NavLink>

            <NavLink className="ml-3 my-2 navLink" as={Link} to='/signup' style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white'})}> Signup</NavLink>
            </>
          )} 
        </Nav>
        </div> 
         </Container>
    </Nav>
);

};

export default AppNavbar;