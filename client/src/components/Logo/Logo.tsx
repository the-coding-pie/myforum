import { Link } from "react-router-dom";
import { LogoWrapper } from "./Logo.style";

const Logo = () => {
  return (
    <LogoWrapper>
      <Link to="/">
        {" "}
        <span className="special-text">My</span>Forum
      </Link>
    </LogoWrapper>
  );
};

export default Logo;
