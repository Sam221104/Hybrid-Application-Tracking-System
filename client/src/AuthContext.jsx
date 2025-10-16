import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? jwtDecode(storedToken) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setUser(jwtDecode(token));
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  // Sync user state if token changes in localStorage (e.g., after login)
  useEffect(() => {
    const handleStorage = () => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      setUser(storedToken ? jwtDecode(storedToken) : null);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
