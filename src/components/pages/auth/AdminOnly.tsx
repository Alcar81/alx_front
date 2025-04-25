import React from "react";
import { Navigate } from "react-router-dom";
import useRoles from "../../../hooks/useRoles";

interface AdminOnlyProps {
  children: React.ReactNode;
}

/**
 * 🔐 Composant de protection pour les pages réservées aux administrateurs.
 * Affiche une redirection ou un message personnalisé si non autorisé.
 */
const AdminOnly: React.FC<AdminOnlyProps> = ({ children }) => {
  const { isAdmin } = useRoles();

  if (!isAdmin) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
        <h2>🔒 Accès refusé</h2>
        <p>Cette section est réservée aux administrateurs.</p>
        <Navigate to="/unauthorized" replace />
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminOnly;
