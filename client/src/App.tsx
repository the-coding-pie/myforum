import { DefaultTheme, ThemeProvider } from "styled-components";
import GlobalStyle from "./globalStyle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainLayout from "./components/layouts/MainLayout/MainLayout";

const theme: DefaultTheme = {
  fonts: {
    ibm: "IBM Plex Sans, sans-serif",
    robotoMono: "'Roboto Mono', monospace"
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

const App = () => {
  return (
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

          <PrivateRoute path="*">
            <MainLayout />
          </PrivateRoute>
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;
