// 📁 src/components/auth/RequireAuth.tsx

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const RequireAuth: React.FC = () => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/connexion" replace />;
  }

  if (!user || user.role.toUpperCase() !== "ADMIN") {
    return <Navigate to="/403" replace />; // 🔒 Redirection vers une page non autorisée (à créer)
  }

  return <Outlet />;
};

export default RequireAuth;
