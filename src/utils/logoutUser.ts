// 📁 src/utils/logoutUser.ts

import { useUserContext } from "../contexts/UserContext";
import { NavigateFunction } from "react-router-dom";

/**
 * Fonction utilitaire pour déconnecter proprement l'utilisateur.
 * Elle efface le contexte et redirige vers /Connexion.
 */
export function logoutUser(navigate: NavigateFunction) {
  try {
    const { logout } = useUserContext();
    logout();
    navigate("/Connexion");
  } catch (error) {
    console.error("❌ Erreur lors de la déconnexion automatique :", error);
  }
}
