import React from 'react';
import Container from 'react-bootstrap/Container';

//Change year automatically
function year() {
  let date = new Date();
  return date.getFullYear();
}

const Footer = () => {
  return (
    <>
    <Container className='text-center' fluid>
    <footer className=' fixed-bottom text-center'>
      <p>Worthly {year()}

          <a href="https://www.linkedin.com/in/zachary-hobba-52aaa182/"><i className="fab fa-linkedin"></i></a>
          <a href="mailto:zachobba@gmail.com"><i className="fas fa-envelope-square"></i></a>
          <a href="https://github.com/HobbaZ"><i className="fab fa-github"></i></a>
      </p>
  </footer>
  </Container>
  </>
  );
};

export default Footer;