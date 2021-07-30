import { Route, Redirect } from "react-router-dom"; 

const ProtectedRoute = ({ children, ...rest }) => {
  const isAuth = localStorage.token;
  
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