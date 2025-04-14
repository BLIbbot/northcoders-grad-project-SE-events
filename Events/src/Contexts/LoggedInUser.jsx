import { createContext, useState } from "react";

export const LoggedInUserContext = createContext({});

export const LoggedInUserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(
    sessionStorage.getItem("staff_id") || null
  );
  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};
