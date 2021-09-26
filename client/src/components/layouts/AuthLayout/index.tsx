import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { RootState } from "../../../app/store";
import { AuthContainer } from "./style";

import AuthBanner from "../../../assets/img/auth.jpg"

const AuthLayout: React.FC = ({ children }) => {
  const { refreshToken } = useSelector((state: RootState) => state.auth);

  if (refreshToken) {
      return <Redirect to="/" />
  }
  return <AuthContainer>
      <img className="banner" src={AuthBanner} alt="auth banner" />

      <div className="content">Helo</div>
  </AuthContainer>;
};

export default AuthLayout;
