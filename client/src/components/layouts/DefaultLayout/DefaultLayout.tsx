import { Switch, Route } from "react-router";
import Community from "../../../pages/Community/Community";
import Error404 from "../../../pages/Error404";
import Home from "../../../pages/Home/Home";
import Navbar from "../../Navbar/Navbar";

const DefaultLayout = () => {
  return (
    <div>
      <Navbar />

      <Switch>
        {/* / */}
        <Route exact path="/">
          <Home />
        </Route>

        {/* /communities */}
        <Route exact path="/c/:name">
          <Community />
        </Route>

        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </div>
  );
};

export default DefaultLayout;
