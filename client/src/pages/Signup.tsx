import axios from "axios";
import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ErrorBox from "../components/ErrorBox/ErrorBox";
import AuthLayout from "../components/layouts/AuthLayout/AuthLayout";
import { BottomText } from "../components/shared/BottomText.style";
import { Button } from "../components/shared/Button.style";
import {
  ErrorText,
  InputBox,
  InputBoxWrapper,
} from "../components/shared/InputBox.style";
import { BASE_URL } from "../types/constants";
import { isValid } from "../utils/helpers";

const Signup = () => {
  const history = useHistory();

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    common: "",
  });

  const registerUser = useCallback(
    (inputs: { username: string; email: string; password: string }) => {
      axios
        .post(
          `${BASE_URL}/auth/register`,
          {
            username: inputs.username.trim(),
            email: inputs.email.trim(),
            password: inputs.password.trim(),
          },
          {
            headers: {
              ContentType: "application/json",
            },
          }
        )
        .then((response) => {
          const data = response.data;

          // empty errors
          setErrors({ username: "", email: "", password: "", common: "" });
          setInputs({ username: "", email: "", password: "" });

          // redirect to /login
          history.push("/login");
        })
        .catch(({ response }) => {
          try {
            const data = response.data;

            switch (response.status) {
              // bad request or Invalid format or conflict
              case 400:
              case 409:
                setErrors((prevValue) => {
                  return {
                    ...prevValue,
                    common: data.message,
                  };
                });
                break;
              default:
                setErrors((prevValue) => {
                  return {
                    ...prevValue,
                    common: "Oops, something went wrong",
                  };
                });
                break;
            }
          } catch (e) {
            setErrors((prevValue) => {
              return {
                ...prevValue,
                common: "Oops, something went wrong",
              };
            });
          }
        });
    },
    []
  );

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

    let errors = {
      username: "",
      email: "",
      password: "",
    };

    // check for errors
    // username
    if (inputs.username === "") {
      errors.username = "Username is required";
    }

    // email
    if (inputs.email === "") {
      errors.email = "Email is required";
    } else if (
      !inputs.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ) {
      errors.email = "Invalid Email";
    }

    // password
    if (inputs.password === "") {
      errors.password = "Password is required";
    } else if (inputs.password.length < 8) {
      errors.password = "Password must be at least 8 chars long";
    }

    setErrors((prevValue) => {
      return {
        ...prevValue,
        ...errors,
      };
    });

    if (isValid(errors)) {
      registerUser(inputs);
    }
  };

  return (
    <AuthLayout title="Sign Up">
      <form onSubmit={handleSubmit}>
        <InputBoxWrapper>
          <InputBox
            type="email"
            placeholder="Email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </InputBoxWrapper>
        <InputBoxWrapper>
          <InputBox
            type="text"
            placeholder="Username"
            name="username"
            value={inputs.username}
            onChange={handleChange}
          />
          {errors.username && <ErrorText>{errors.username}</ErrorText>}
        </InputBoxWrapper>
        <InputBoxWrapper>
          <InputBox
            type="password"
            placeholder="Password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
        </InputBoxWrapper>

        <Button>Sign Up</Button>

        {errors.common && <ErrorBox error={errors.common} />}

        <BottomText>
          Already have an account? <Link to="/login">Log In</Link>
        </BottomText>
      </form>
    </AuthLayout>
  );
};

export default Signup;
