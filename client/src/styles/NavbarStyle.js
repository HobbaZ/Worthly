import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

import '../app.css';

export const TitleNav = styled.span`
font-family: 'Fugaz One', cursive;
font-size: 40px;
`;

export const Nav = styled.nav`
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 2px solid black;

  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const NavLink = styled(Link)`
  color: rgb(0, 0, 0);
  margin: 0 auto;
  font-size: 25px;
  font-weight: 500;
  text-decoration: none;
  padding: 5px;
  cursor: pointer;

  :active {
    color: black;
  }

  :hover {
      color: white;
      background: black;
  }
`;

export const NavBtnLink = styled.button`
  align-items: center;
  width: 100px;
  background: rgba(255, 255, 255, 0);
  border: none;
  margin: 0 auto;
  font-size: 25px;
  font-weight: 500;
  text-decoration: none;
  padding: 10px;
  cursor: pointer;

  :active {
    color: rgb(255, 255, 255);
  }

  :hover {
      color: white;
      background: black;
  }
`;
  