import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Register from "./components/register/Register";
import Login from "./components/login/Login";
import MainContainer from "./components/main-container/MainContainer";

import types from "./common/routeTypes";
const {
  ROUTE_REGISTER,
  ROUTE_LOGIN,
  ROUTE_PROFILE
} = types;

function App() {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path={ROUTE_LOGIN} component={Login} />
        <Route exact path={ROUTE_REGISTER} component={Register} />
        <Route path={ROUTE_PROFILE} component={MainContainer} />
      </Switch>
    </Fragment>
  );
}

export default App;
