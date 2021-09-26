import { Link } from "react-router-dom";
import { NavbarWrapper } from "./style";


const Navbar = () => {
  return <NavbarWrapper>
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/communities">Communities</Link>
        </li>
      </ul>
  </NavbarWrapper>;
};

export default Navbar;
