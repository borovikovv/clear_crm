import React, { Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { checkAuth } from "./actions/authActions";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import MainContainer from "./components/main-container/MainContainer";
import ProtectedRoute from "./components/common/protected-route/ProtectedRoute";

import types from "./common/routeTypes";
const {
  ROUTE_REGISTER,
  ROUTE_LOGIN
} = types;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.token) {
      dispatch(checkAuth());
    }
  }, []);

  return (
    <Fragment>
      <Switch>
        <Route exact path={ROUTE_LOGIN} component={Login} />
        <Route exact path={ROUTE_REGISTER} component={Register} />
        <ProtectedRoute>
          <Route path="/" component={MainContainer} />
        </ProtectedRoute>
      </Switch>
    </Fragment>
  );
}

export default App;
