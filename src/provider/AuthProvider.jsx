import { useState } from "react";
import { AuthContext } from "../context";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthProvider = ({ children }) => {
  const [authStorage, setAuthStorage] = useLocalStorage("auth", "");
  const [auth, setAuth] = useState(authStorage?.user ? authStorage : {});

  return (
    <AuthContext.Provider value={{ auth, setAuth, setAuthStorage }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
