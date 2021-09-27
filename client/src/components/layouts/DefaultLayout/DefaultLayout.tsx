import { Switch, Route } from "react-router";
import Community from "../../../pages/Community/Community";
import Error404 from "../../../pages/Error404";
import Home from "../../../pages/Home/Home";
import PostDetail from "../../../pages/PostDetail/PostDetail";
import User from "../../../pages/User/User";
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

        {/* /c/:name */}
        <Route exact path="/c/:name">
          <Community />
        </Route>

        {/* /u/:username */}
        <Route exact path="/u/:username">
          <User />
        </Route>

         {/* /posts/:id */}
         <Route exact path="/posts/:id">
          <PostDetail />
        </Route>

        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </div>
  );
};

export default DefaultLayout;
