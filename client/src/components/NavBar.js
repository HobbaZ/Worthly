import React from 'react';
import { NavLink, Nav, NavBtnLink, TitleNav, NavLayout } from '../styles/NavbarStyle'

import Auth from '../utils/auth';

const AppNavbar = () => {

  return (
    <>
    {/*Show if user not logged in or logged in*/}
      <Nav>
          
          <NavLink to='/'><TitleNav>Worthly</TitleNav></NavLink>

          <NavLayout>
          <NavLink to='/search'>Search</NavLink>

          {/*Only show if user logged in*/}
          {Auth.loggedIn() ? ( 
            <>
          <NavLink to='/saved'>Your Saved Stuff</NavLink>

          <NavLink to='/profile'>Your Profile</NavLink>
          
          <NavBtnLink onClick={Auth.logout}> Logout</NavBtnLink>
          </>
           ) : (
             <>
             {/*Show if user not logged in*/}
          <NavLink to='/login'>Login</NavLink>

          <NavLink to='/signup'>Sign Up</NavLink>
          </>
          )}  
          </NavLayout>  
      </Nav>
    </>
  );
};

export default AppNavbar;