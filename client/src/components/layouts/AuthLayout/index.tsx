import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { RootState } from "../../../app/store";

import AuthBanner from "../../../assets/img/auth.jpg";
import { AuthContent } from "./AuthContent";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #ffffff;
  display: grid;
  grid-template-columns: 1fr 4fr;
  & > .banner {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

interface Props {
  title: string;
}

const AuthLayout: React.FC<Props> = ({ children, title }) => {
  const { refreshToken } = useSelector((state: RootState) => state.auth);

  if (refreshToken) {
    return <Redirect to="/" />;
  }
  return (
    <Wrapper>
      <img className="banner" src={AuthBanner} alt="auth banner" />

      <AuthContent>
        <div>
          <h1>{title}</h1>

          {children}
        </div>
      </AuthContent>
    </Wrapper>
  );
};

export default AuthLayout;
