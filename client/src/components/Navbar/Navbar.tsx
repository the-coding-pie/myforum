import { Link } from "react-router-dom";
import Logo from "./Logo/Logo";
import SearchBox from "./SearchBox/SearchBox";
import { NavbarWrapper, NavContainer, NavLeft, NavRight } from "./Navbar.style";
import CreateButton from "./CreateButton/CreateButton";
import ProfileCard from "./ProfileCard/ProfileCard";

const Navbar = () => {
  return (
    <NavbarWrapper>
      <NavContainer>
        <NavLeft>
          <Logo />
          <SearchBox />
        </NavLeft>

        <NavRight>
          <CreateButton />
          <ProfileCard />
        </NavRight>
      </NavContainer>
    </NavbarWrapper>
  );
};

export default Navbar;
