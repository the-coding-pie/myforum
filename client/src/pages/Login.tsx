import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
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
import { loginUser } from "../features/authSlice";
import { BASE_URL } from "../types/constants";
import { isValid } from "../utils/helpers";

const Login = () => {
  const history = useHistory();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    common: "",
  });

  const dispatch = useDispatch();

  const login = useCallback((inputs: { email: string; password: string }) => {
    axios
      .post(
        `${BASE_URL}/auth/login`,
        {
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
        const { data } = response.data;

        // empty errors
        setErrors({ email: "", password: "", common: "" });
        setInputs({ email: "", password: "" });

        dispatch(
          loginUser({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
          })
        );
      })
      .catch(({ response }) => {
        try {
          const data = response.data;

          switch (response.status) {
            // bad request or invalid format or unauthorized
            case 400:
            case 401:
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
  }, []);

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
      email: "",
      password: "",
    };

    // check for errors
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
    }

    setErrors((prevValue) => {
      return {
        ...prevValue,
        ...errors,
      };
    });

    if (isValid(errors)) {
      login(inputs);
    }
  };

  return (
    <AuthLayout title="Log In">
      <form onSubmit={handleSubmit}>
        <InputBoxWrapper>
          <InputBox
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={inputs.email}
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </InputBoxWrapper>
        <InputBoxWrapper>
          <InputBox
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={inputs.password}
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
        </InputBoxWrapper>

        <Button type="submit">Log In</Button>

        {errors.common && <ErrorBox error={errors.common} />}

        <BottomText>
          New to MyForum? <Link to="/signup">Sign Up</Link>
        </BottomText>
      </form>
    </AuthLayout>
  );
};

export default Login;
