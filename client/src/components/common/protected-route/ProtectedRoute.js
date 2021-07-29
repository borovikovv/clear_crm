import { Route, Redirect } from "react-router-dom"; 

const ProtectedRoute = ({ isAuth, children, ...rest }) => {
  
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

export default ProtectedRoute;