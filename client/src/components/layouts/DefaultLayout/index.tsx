import { Switch, Route } from "react-router";
import Communities from "../../../pages/Communities";
import Error404 from "../../../pages/Error404";
import Home from "../../../pages/Home";
import Navbar from "../../Navbar";
import { DefaultContainer } from "./style";

const DefaultLayout = () => {
  return (
    <DefaultContainer>
      <Navbar />

      <Switch>
        {/* / */}
        <Route exact path="/">
          <Home />
        </Route>

        {/* /communities */}
        <Route exact path="/communities">
          <Communities />
        </Route>

        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </DefaultContainer>
  );
};

export default DefaultLayout;
