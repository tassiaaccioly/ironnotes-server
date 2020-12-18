import React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "../../components/navbar/NavBar";
import SignUp from "./signup/SignUp";
import Login from "./login/Login";
import DeleteUser from "./delete/DeleteUser";
import Profile from "./profile/Profile";
import EditProfile from "./profile/EditProfile";
import About from "./about/About";

function AuthRouter(props) {
  return (
    <React.Fragment>
      <NavBar history={props.history} />
      <Switch>
        <Route path={`${props.match.path}/signup`} component={SignUp} />
        <Route path={`${props.match.path}/login`} component={Login} />
        <Route path={`${props.match.path}/about`} component={About} />
        <Route path={`${props.match.path}/delete/:id`} component={DeleteUser} />
        <Route exact path={`${props.match.path}/profile`} component={Profile} />
        <Route
          path={`${props.match.path}/profile/edit`}
          component={EditProfile}
        />
      </Switch>
    </React.Fragment>
  );
}

export default AuthRouter;
