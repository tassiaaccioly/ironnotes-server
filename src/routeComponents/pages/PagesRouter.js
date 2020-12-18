import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "./NoteComponents/NoteStyles/globalStyles";
import { LightTheme, DarkTheme } from "./NoteComponents/NoteStyles/themes";

import Sidebar from "./NoteComponents/Sidebar";
import Page from "./NoteComponents/Page";
import Search from "./NoteComponents/PageEvents/searchpage/SearchPage";
import HowTo from "./NoteComponents/HowTo";
import EditPage from "./NoteComponents/PageEvents/EditPage";
import NewPage from "./NoteComponents/PageEvents/NewPage";
import NewQuote from "./NoteComponents/quotes/AddNewQuote";

function PagesRouter(props) {
  const history = useHistory();
  const [theme, setTheme] = useState("light");
  return (
    <React.Fragment>
      <ThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
        <Sidebar history={history} themes={{ theme: [theme, setTheme] }} />
        <Switch>
          <Route
            exact
            path={`${props.match.path}`}
            render={(routeProps) => {
              return (
                <HowTo {...routeProps} themes={{ theme: [theme, setTheme] }} />
              );
            }}
          />
          <Route
            exact
            path={`${props.match.path}/search`}
            render={(routeProps) => {
              return (
                <Search {...routeProps} themes={{ theme: [theme, setTheme] }} />
              );
            }}
          />
          <Route
            exact
            path={`${props.match.path}/newquote`}
            component={NewQuote}
          />
          <Route
            exact
            path={`${props.match.path}/edit/:id`}
            component={EditPage}
          />
          <Route
            exact
            path={`${props.match.path}/newpage`}
            component={NewPage}
          />
          <Route path={`${props.match.path}/:id`} component={Page} />
          <GlobalStyle />
        </Switch>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default PagesRouter;
