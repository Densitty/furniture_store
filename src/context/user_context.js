import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const data = useAuth0();
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = data;

  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    console.log("user is ", user);
    console.log("isAuthenticated is ", isAuthenticated);
    console.log("loading ", isLoading);
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{ user, loginWithRedirect, logout }}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
