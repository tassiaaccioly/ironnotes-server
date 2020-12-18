import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";

import Home from "./home/Home";
import AuthRouter from "../routeComponents/auth/AuthRouter";
import PagesRouter from "../routeComponents/pages/PagesRouter";

import InternalServerError from "./internalservererror/InternalServerError";
import NoMatch from "./nomatch/NoMatch";
import Quotes from "../routeComponents/pages/NoteComponents/quotes/Quotes";

import { AuthContextComponent } from "../contexts/authContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContextComponent>
          <Switch>
            <Route exact path="/" component={Home} />

            {/* Login, Signup, Logout and Profile routes */}
            <Route path="/auth" component={AuthRouter} />

            {/* Pages router */}
            <Route path="/pages" component={PagesRouter} />

            {/* Quotes router */}
            <Route path="/quote" component={Quotes} />

            {/* error handling routes  */}
            <Route
              path="/internalservererror"
              component={InternalServerError}
            />
            <Route path="*" component={NoMatch} />
          </Switch>
        </AuthContextComponent>
      </BrowserRouter>
    </div>
  );
}

export default App;
