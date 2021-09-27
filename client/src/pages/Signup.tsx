import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/layouts/AuthLayout/AuthLayout";
import { BottomText } from "../components/shared/BottomText.style";
import { Button } from "../components/shared/Button.style";
import { InputBox } from "../components/shared/InputBox.style";

const Signup = () => {
  const [inputs, setInputs] = useState({
    email: "",
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
    <AuthLayout title="Sign Up">
      <form onSubmit={handleSubmit}>
        <InputBox
          type="email"
          placeholder="Email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
        />
        <InputBox
          type="text"
          placeholder="Username"
          name="username"
          value={inputs.username}
          onChange={handleChange}
        />
        <InputBox
          type="password"
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />

        <Button>Sign Up</Button>

        <BottomText>
          Already have an account? <Link to="/login">Log In</Link>
        </BottomText>
      </form>
    </AuthLayout>
  );
};

export default Signup;
