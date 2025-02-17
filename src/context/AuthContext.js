import React, { createContext, useState, useContext } from "react";
import { login as authLogin, logout as authLogout } from "./authService";

// Create Auth Context
const AuthContext = createContext();

// AuthProvider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Store user in state only (not in localStorage)

  // Login function
  const login = async (email, password) => {
    const userData = await authLogin(email, password);
    if (userData) {
      setUser(userData); // Store user details in memory
    }
  };

  // Logout function
  const logout = () => {
    authLogout();
    setUser(null); // Clear user data from memory
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook to use Auth Context
export function useAuth() {
  return useContext(AuthContext);
}