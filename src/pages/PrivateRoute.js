import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
//
// import { useUserContext } from "../context/user_context";

const PrivateRoute = ({ children, ...rest }) => {
  // children is the component wrapped btw the component; rest is the navigation props, coming from the react

  // const { myUser } = useUserContext();
  // not using myUser from user-context 'cos there might be a delay in getting myUser which can result in a little bug (especially in geting to /checkout page)

  const { user } = useAuth0();

  return (
    <Route
      {...rest}
      render={() => {
        return user ? children : <Redirect to="/" />;
      }}
    ></Route>
  );
};
export default PrivateRoute;
