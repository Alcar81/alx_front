// 📁 src/components/auth/RequireAuth.tsx

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const RequireAuth: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/connexion" replace />;
};

export default RequireAuth;
