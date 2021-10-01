import { DefaultTheme, ThemeProvider } from "styled-components";
import GlobalStyle from "./globalStyle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainLayout from "./components/layouts/MainLayout/MainLayout";
import axios from "axios";
import { logoutUser, setAccessToken } from "./features/authSlice";
import store from "./app/store";
import { BASE_URL, ERROR } from "./types/constants";
import Toasts from "./components/Toasts/Toasts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addToast } from "./features/toastSlice";

const theme: DefaultTheme = {
  fonts: {
    ibm: "IBM Plex Sans, sans-serif",
    robotoMono: "'Roboto Mono', monospace",
  },
  colors: {
    bg: "#dae0e6",
    primary: "#1384D7",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    dxl: "1.5rem",
  },
};

let isFirst = true;

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    // try to refresh the token for one time and it is not login route

    if (
      isFirst &&
      error.response.status === 401 &&
      !originalRequest.url.includes("login")
    ) {
      isFirst = false;

      // try to get a new access_token
      return axios
        .post(`${BASE_URL}/auth/refresh`, {
          refresh_token: store.getState().auth.refreshToken,
        })
        .then((response) => {
          // get the access_token
          const { access_token } = response.data.data;

          store.dispatch(
            setAccessToken({
              access_token,
            })
          );

          originalRequest.headers["Authorization"] = "Bearer " + access_token;

          // user can again request for refresh_token
          isFirst = true;

          // retry the original request
          return axios(originalRequest);
        });
    }

    // if error === 401, then do the following, or reject Promise
    if (
      error.response.status === 401 &&
      !originalRequest.url.includes("login")
    ) {
      store.dispatch(
        addToast({
          kind: ERROR,
          msg: "Token expired!",
        })
      );
      store.dispatch(logoutUser());
    }
    return Promise.reject(error);
  }
);

const App = () => {
  return (
    <div>
      <Toasts />
      <ToastContainer position="bottom-left" />

      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>

            <Route path="*">
              <MainLayout />
            </Route>
          </Switch>
        </ThemeProvider>
      </Router>
    </div>
  );
};

export default App;
