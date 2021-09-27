import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo/Logo";
import SearchBox from "./SearchBox/SearchBox";
import {
  Buttons,
  NavbarWrapper,
  NavContainer,
  NavLeft,
  NavLinks,
  NavRight,
} from "./Navbar.style";
import CreateButton from "./CreateButton/CreateButton";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Button } from "../shared/Button.style";

const Navbar = () => {
  const { refreshToken, user } = useSelector((state: RootState) => state.auth);

  return (
    <NavbarWrapper>
      <NavContainer>
        <NavLeft>
          <Logo />
          <SearchBox />
        </NavLeft>

        <NavRight>
          {refreshToken ? (
            <>
              <CreateButton />

              <NavLinks>
                <li><NavLink to={`/u/thecodingpie`}>theCodingpie</NavLink></li>
                <li><NavLink to={`/logout`}>Logout</NavLink></li>
              </NavLinks>
            </>
          ) : (
            <Buttons>
              <Link to="/login">
                <Button light sm>
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button sm>Sign Up</Button>
              </Link>
            </Buttons>
          )}
        </NavRight>
      </NavContainer>
    </NavbarWrapper>
  );
};

export default Navbar;