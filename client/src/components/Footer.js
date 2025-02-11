import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";

//Change year automatically
function year() {
  let date = new Date();
  return date.getFullYear();
}

const Footer = () => {
  return (
    <>
      <Container className="text-center" fluid>
        <footer className=" fixed-bottom text-center w-100">
          <p>
            Worthly, {year()}
            <a
              className="btn footer-btn ml-1"
              type="button"
              href="https://www.linkedin.com/in/zachary-hobba-52aaa182/"
            >
              <i className="fab fa-linkedin icon"></i>
            </a>
            <a
              className="btn footer-btn ml-1"
              type="button"
              href="mailto:zachobba@gmail.com"
            >
              <i className="fas fa-envelope-square icon"></i>
            </a>
            <a
              className="btn footer-btn ml-1"
              type="button"
              href="https://github.com/HobbaZ"
            >
              <i className="fab fa-github icon"></i>
            </a>
          </p>
        </footer>
      </Container>
    </>
  );
};

export default Footer;
