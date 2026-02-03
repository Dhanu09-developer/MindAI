import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem("mindcare_current_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (role) => {
    // Simulating login by creating a new session or fetching an existing dummy user for the role
    const newUser = {
      id: uuidv4(),
      role: role,
      name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
      email: `${role}@mindcare.ai`,
      last_login: new Date().toISOString(),
    };

    // In a real app, we'd check credentials. Here we just set the role.
    // We also save this user to our "DB" if it's a persistent identity,
    // but for this demo, we'll treat every login as a session start.
    db.users.create(newUser);

    localStorage.setItem("mindcare_current_user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("mindcare_current_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
