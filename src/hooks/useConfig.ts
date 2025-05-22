// 📁 src/hooks/useConfig.ts

import config from "../config/config";
import { configSchema } from "../config/configSchema";

/**
 * Retourne la configuration typée à partir du .env
 * Si la validation échoue, retourne une version vide
 * permettant à App.tsx de détecter les erreurs.
 */
export function useConfig(): {
  API_URL: string;
  FRONTEND_URL: string;
  WEBSITE_NAME: string;
  MAINTENANCE_MODE: boolean;
  ENABLE_DEBUG: boolean;
} {
  const parsed = configSchema.safeParse(config);

  if (!parsed.success) {
    console.error("❌ config invalide :", parsed.error.format());
    return {
      API_URL: "",
      FRONTEND_URL: "",
      WEBSITE_NAME: "",
      MAINTENANCE_MODE: false,
      ENABLE_DEBUG: false,
    };
  }

  const {
    REACT_APP_API_URL,
    REACT_APP_FRONTEND_URL,
    REACT_APP_WEBSITE_NAME,
    REACT_APP_MAINTENANCE_MODE,
    REACT_APP_ENABLE_DEBUG,
  } = parsed.data;

  return {
    API_URL: REACT_APP_API_URL,
    FRONTEND_URL: REACT_APP_FRONTEND_URL,
    WEBSITE_NAME: REACT_APP_WEBSITE_NAME,
    MAINTENANCE_MODE: REACT_APP_MAINTENANCE_MODE,
    ENABLE_DEBUG: REACT_APP_ENABLE_DEBUG,
  };
}
