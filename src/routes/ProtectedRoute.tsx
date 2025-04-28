// 📁 src/routes/ProtectedRoute.tsx

import { Navigate, useLocation, useParams } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];  
  allowSelf?: boolean;      
}

const ProtectedRoute = ({ children, allowedRoles = [], allowSelf = false }: ProtectedRouteProps) => {
  const { user } = useUserContext();
  const location = useLocation();
  const params = useParams();

  if (!user) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[ProtectedRoute] 🚫 Non connecté - Redirection Accueil depuis ${location.pathname}`);
    }
    return <Navigate to="/Accueil" state={{ from: location }} replace />;
  }

  const hasAllowedRole = allowedRoles.length === 0 || user.roles.some((r) => allowedRoles.includes(r));

  let isSelfAccess = false;
  if (allowSelf) {
    if (location.pathname.startsWith("/profile")) {
      isSelfAccess = true;
    } else if (params.userId && params.userId === user.id) {
      isSelfAccess = true;
    }
  }

  if (hasAllowedRole || isSelfAccess) {
    if (process.env.NODE_ENV === "development") {
      console.log(`[ProtectedRoute] ✅ Accès autorisé pour ${user.email} sur ${location.pathname}`);
    }
    return children;
  }

  if (process.env.NODE_ENV === "development") {
    console.warn(`[ProtectedRoute] ❌ Accès refusé pour ${user.email} sur ${location.pathname}`);
  }

  return <Navigate to="/Unauthorized" replace />;
};

export default ProtectedRoute;
