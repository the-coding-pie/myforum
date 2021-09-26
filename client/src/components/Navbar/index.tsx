import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./style";

const Navbar = () => {
  return <Container>
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/communities">Communities</Link>
        </li>
      </ul>
  </Container>;
};

export default Navbar;
