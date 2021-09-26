import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 3.5rem;
  background: #ffffff;
  box-shadow: 2px 0px 3px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
`;

const Navbar = () => {
  return <Wrapper>
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/communities">Communities</Link>
        </li>
      </ul>
  </Wrapper>;
};

export default Navbar;
