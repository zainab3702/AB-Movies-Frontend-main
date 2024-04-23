/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

//  auth context for providing auth and setAuth values to the whole app
export const AuthContext = createContext({});
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
