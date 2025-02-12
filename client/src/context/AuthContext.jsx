import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserAuth, setIsUserAuth] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (token) {
      setIsUserAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isUserAuth, setIsUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
