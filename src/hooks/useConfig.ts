import { configSchema } from "../config/configSchema";
import config from "../config/config"; // Le fichier contenant les valeurs .env chargées

export function useConfig() {
  const parsed = configSchema.parse(config);

  // ✅ Aliases plus courts, exposés aux composants
  return {
    API_URL: parsed.REACT_APP_API_URL,
    FRONTEND_URL: parsed.REACT_APP_FRONTEND_URL,
    WEBSITE_NAME: parsed.REACT_APP_WEBSITE_NAME,
    ENABLE_DEBUG: parsed.REACT_APP_ENABLE_DEBUG,
    MAINTENANCE_MODE: parsed.REACT_APP_MAINTENANCE_MODE,
  };
}
