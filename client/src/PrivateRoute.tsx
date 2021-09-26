import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";
import { RootState } from "./app/store";

interface Props extends RouteProps {}

const PrivateRoute = ({ children, ...rest }: Props) => {
  const { refreshToken } = useSelector((state: RootState) => state.auth);

  if (refreshToken) {
    return <Route {...rest}>{children}</Route>;
  }

  return <Redirect to="/login" />;
};

export default PrivateRoute;
