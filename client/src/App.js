import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Register from "./components/register/Register";

import types from "./common/routeTypes";
const {
  ROUTE_REGISTER
} = types;

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path={ROUTE_REGISTER} component={Register} />
      </Switch>
    </Fragment>
  );
}

export default App;
