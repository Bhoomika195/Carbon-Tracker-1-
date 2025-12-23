import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const signup = async ({ name, email, password }) => {
    try {
      const res = await api.post("/auth/signup", { name, email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      return { user: res.data.user };
    } catch (err) {
      return { error: err.response?.data || { message: err.message } };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      return { user: res.data.user };
    } catch (err) {
      return { error: err.response?.data || { message: err.message } };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
