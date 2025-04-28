import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/auth/status", {
        credentials: "include",
      });

      if (response.ok) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    } catch (error) {
      console.error("Authentication check failed:", error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      if (response.ok) {
        setIsLoggedIn(true);
        window.location.href = "/";
      } else {
        setIsLoggedIn(false);
        return { error: "Incorrect Login." };
      }
    } catch (error) {
      console.error("Login failed:", error);
      return { error: "Something went wrong." };
    }
  };

  const createAccount = async (credentials) => {
    console.log(credentials);

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      if (!response.ok) return { error: "Something went wrong." };
      alert("Succesfully created account!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Login failed:", error);
      return { error: "Something went wrong." };
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return <AuthContext.Provider value={{ isLoggedIn, login, logout, createAccount, loading, checkAuthStatus }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
