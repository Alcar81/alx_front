// 📁 src/contexts/UserContext.tsx
import React, { createContext, useState, useEffect } from "react";

// 🔐 Interface pour un utilisateur
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[]; // 🔄 Maintenant un tableau de rôles
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
export const UserContext = createContext<AuthContextType | undefined>(undefined);

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
      } catch (e) {
        console.error("❌ Erreur de parsing localStorage :", e);
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
    window.location.href = "/Accueil"; // ou useNavigate si tu veux une redirection contrôlée
  };

  const isLoggedIn = !!user && !!token;

  return (
    <UserContext.Provider value={{ user, token, login, logout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
