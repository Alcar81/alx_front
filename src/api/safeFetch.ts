// 📁 src/api/safeFetch.ts

import { useConfig } from "../hooks/useConfig";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

/**
 * Hook de sécurisation des appels API avec gestion auto du token et déconnexion 401.
 */
export function useSafeFetch() {
  const { API_URL } = useConfig();
  const safeApiUrl = API_URL || "/api";
  const { logout } = useUserContext();
  const navigate = useNavigate();

  function buildUrl(endpoint: string): string {
    return `${safeApiUrl}${endpoint}`;
  }

  async function safeFetch(input: RequestInfo, init?: RequestInit) {
    try {
      const response = await fetch(input, init);

      if (response.status === 401) {
        console.warn("🔒 Token expiré ➔ déconnexion automatique");
        logout();
        navigate("/Connexion");
        throw new Error("Session expirée. Redirection...");
      }

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        if (contentType?.includes("application/json")) {
          const data = await response.json();
          throw new Error(data.message || "Erreur de requête.");
        } else {
          throw new Error("Le serveur a retourné un format inattendu.");
        }
      }

      if (contentType?.includes("application/json")) {
        return await response.json();
      } else {
        throw new Error("Format de réponse non supporté.");
      }
    } catch (error: any) {
      console.error("❌ safeFetch échoué :", error);
      throw new Error(error.message || "Erreur réseau ou serveur.");
    }
  }

  return { safeFetch, buildUrl };
}
