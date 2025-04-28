// 📁 src/routes/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];  // ex: ["ADMIN"]
  allowSelf?: boolean;      // ex: true pour son propre profil
}

const ProtectedRoute = ({ children, allowedRoles = [], allowSelf = false }: ProtectedRouteProps) => {
  const { user } = useUserContext();
  const location = useLocation();

  if (!user) {
    // Pas connecté ➔ on retourne vers l'Accueil au lieu de Connexion
    return <Navigate to="/Accueil" state={{ from: location }} replace />;
  }

  const hasAllowedRole = allowedRoles.length === 0 || user.roles.some((r) => allowedRoles.includes(r));
  const isSelfAccess = allowSelf && location.pathname === "/profile";

  if (hasAllowedRole || isSelfAccess) {
    return children;
  }

  // ❌ Sinon, accès non autorisé
  return <Navigate to="/Unauthorized" replace />;
};

export default ProtectedRoute;
