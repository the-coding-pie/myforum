import { Switch, Route } from "react-router";
import Community from "../../../pages/Community/Community";
import CreatePost from "../../../pages/CreatePost/CreatePost";
import Error404 from "../../../pages/Error404";
import Home from "../../../pages/Home/Home";
import Logout from "../../../pages/Logout";
import PostDetail from "../../../pages/PostDetail/PostDetail";
import Search from "../../../pages/Search/Search";
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

        {/* /create */}
        <Route exact path="/create">
          <CreatePost />
        </Route>

        {/* /search/?q=:query */}
        <Route exact path="/search/">
          <Search />
        </Route>

        {/* /logout */}
        <Route exact path="/logout">
          <Logout />
        </Route>

        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </div>
  );
};

export default DefaultLayout;
