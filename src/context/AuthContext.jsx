import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/lib/mysql-db";
import { v4 as uuidv4 } from "uuid";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem("mindcare_current_user");
    const storedToken = localStorage.getItem("mindcare_token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    } else if (storedUser) {
      // Fallback for localStorage-only sessions
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (role, email = null, password = null) => {
    try {
      // For demo purposes, allow role-based login without password
      const userEmail = email || `${role}@mindcare.ai`;
      const user = await db.login(userEmail, password, role);
      setUser(user);
      return user;
    } catch (error) {
      console.error("Login failed:", error);
      // Fallback to localStorage for demo
      const newUser = {
        id: uuidv4(),
        role: role,
        name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
        email: userEmail,
        last_login: new Date().toISOString(),
      };

      localStorage.setItem("mindcare_current_user", JSON.stringify(newUser));
      setUser(newUser);
      return newUser;
    }
  };

  const logout = () => {
    db.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
