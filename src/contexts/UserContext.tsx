// 📁 src/contexts/UserContext.tsx

import React, { createContext, useState, useEffect, useContext } from "react";

// 🔐 Interface pour un utilisateur
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[]; // Plusieurs rôles
  createdAt: string;
}

// ✅ Interface du contexte d'authentification
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

// 📦 Création du contexte
const UserContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Provider global
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        console.error("❌ Erreur de parsing localStorage :", error);
      }
    }
  }, []);

  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const isLoggedIn = !!user && !!token;

  return (
    <UserContext.Provider value={{ user, token, login, logout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Hook exporté proprement
export const useUserContext = (): AuthContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext doit être utilisé dans un UserProvider");
  }
  return context;
};
