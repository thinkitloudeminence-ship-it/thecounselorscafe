import React, { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("cc_admin_token");
    if (token) {
      getMe()
        .then((res) => setAdmin(res.data.data))
        .catch(() => {
          localStorage.removeItem("cc_admin_token");
          localStorage.removeItem("cc_admin_user");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token, adminData) => {
    localStorage.setItem("cc_admin_token", token);
    localStorage.setItem("cc_admin_user", JSON.stringify(adminData));
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem("cc_admin_token");
    localStorage.removeItem("cc_admin_user");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
