import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialize from cookies (use same keys as LoginForm)
  const [cktoken, setToken] = useState(() => Cookies.get("ckusertoken") || null);
  const [ckemail, setEmail] = useState(() => Cookies.get("ckuseremail") || null);
  const [ckadmin, setAdmin] = useState(() => Cookies.get("ckadmin") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!cktoken);

  useEffect(() => {
    if (cktoken) {
      Cookies.set("ckusertoken", cktoken, { expires: 7 });
      if (ckemail) {
        Cookies.set("ckuseremail", ckemail, { expires: 7 });
      }
      if (ckadmin) {
        Cookies.set("ckadmin", ckadmin, { expires: 7 });
      }
      setIsAuthenticated(true);
    } else {
      Cookies.remove("ckusertoken");
      Cookies.remove("ckuseremail");
      Cookies.remove("ckadmin");
      setIsAuthenticated(false);
      setEmail(null);
      setAdmin(null);
    }
  }, [cktoken, ckemail, ckadmin]);

  const loginuser = (newToken, userdata) => {
    setToken(newToken);
    setEmail(userdata.email);
    setAdmin(userdata.username); // store username as admin (or role if needed)
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{ cktoken, ckemail, ckadmin, isAuthenticated, loginuser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
