import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { RootState } from "../../../app/store";

import AuthBanner from "../../../assets/img/auth.jpg";
import { AuthContent, AuthWrapper } from "./AuthLayout.style";

interface Props {
  title: string;
}

const AuthLayout: React.FC<Props> = ({ children, title }) => {
  const { accessToken, refreshToken } = useSelector((state: RootState) => state.auth);

  if (accessToken || refreshToken) {
    return <Redirect to="/" />;
  }
  
  return (
    <AuthWrapper>
      <img className="banner" src={AuthBanner} alt="auth banner" />

      <AuthContent>
        <div>
          <h1>{title}</h1>

          {children}
        </div>
      </AuthContent>
    </AuthWrapper>
  );
};

export default AuthLayout;
