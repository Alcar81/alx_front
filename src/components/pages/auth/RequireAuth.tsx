// 📁 src/components/pages/auth/RequireAuth.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

interface RequireAuthProps {
  roles?: string[]; // 👈 optionnel
  fallback?: React.ReactElement;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ roles, fallback = <Navigate to="/Connexion" />, }) => {
  const { user, isLoggedIn } = useAuth();

  const hasAccess = () => {
    if (!isLoggedIn) return false;
    if (!roles) return true;
    return user?.roles?.some((role: string) => roles.includes(role.toLowerCase()));
  };

  return hasAccess() ? <Outlet /> : fallback;
};

export default RequireAuth;
