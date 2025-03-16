// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUserId = localStorage.getItem("userId");
    const savedUserName = localStorage.getItem("userName");
    if (savedToken) {
      setToken(savedToken);
      setUserId(savedUserId);
      setUserName(savedUserName);
    }
  }, []);

  const login = (tokenValue, userIdValue, userNameValue) => {
    setToken(tokenValue);
    setUserId(userIdValue);
    setUserName(userNameValue);
    localStorage.setItem("authToken", tokenValue);
    localStorage.setItem("userId", userIdValue);
    localStorage.setItem("userName", userNameValue);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setUserName("");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
  };

  return (
    <AuthContext.Provider value={{ token, userId, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
