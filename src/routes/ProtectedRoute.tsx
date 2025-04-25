// src/routes/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import useRoles from "../hooks/useRoles";

export const ProtectedRoute = ({ children, roles }: { children: JSX.Element, roles: string[] }) => {
  const { hasAnyRole } = useRoles();

  return hasAnyRole(...roles) ? children : <Navigate to="/unauthorized" replace />;
};
