import React, { Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkAuth } from "./actions/authActions";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import MainContainer from "./components/main-container/MainContainer";
import Loading from "./components/common/loading/Loading";
import ProtectedRoute from "./components/common/protected-route/ProtectedRoute";

import types from "./common/routeTypes";
const {
  ROUTE_REGISTER,
  ROUTE_LOGIN,
  ROUTE_PROFILE
} = types;

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth)

  useEffect(() => {
    if(localStorage.token) {
      dispatch(checkAuth());
    }
  }, []);

  if(!isAuth) {
    return <Loading />
  }

  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path={ROUTE_LOGIN} component={Login} />
        <Route exact path={ROUTE_REGISTER} component={Register} />
        <ProtectedRoute isAuth={isAuth}>
          <Route path={ROUTE_PROFILE} component={MainContainer} />
        </ProtectedRoute>
      </Switch>
    </Fragment>
  );
}

export default App;
