import React from "react";
import UserContext from "./UserContext";

const demoUser = {
  username: "test",
  first_name: "test_first",
  last_name: "test_last",
  email: "test@mail.com",
  photo_url: null
};

const UserProvider = ({ children, currentUser = demoUser }) => (
  <UserContext.Provider value={{currentUser}}>
    {children}
  </UserContext.Provider>
);

export { UserProvider };
