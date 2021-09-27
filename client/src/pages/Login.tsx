import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/layouts/AuthLayout/AuthLayout";
import { BottomText } from "../components/shared/BottomText.style";
import { Button } from "../components/shared/Button.style";
import { InputBox } from "../components/shared/InputBox.style";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevValue) => {
      return {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <AuthLayout title="Log In">
      <form onSubmit={handleSubmit}>
        <InputBox
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={inputs.username}
        />
        <InputBox
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={inputs.password}
        />

        <Button>Log In</Button>

        <BottomText>
          New to MyForum? <Link to="/signup">Sign Up</Link>
        </BottomText>
      </form>
    </AuthLayout>
  );
};

export default Login;
