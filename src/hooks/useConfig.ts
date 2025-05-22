// 📁 src/hooks/useConfig.ts

import config from "@/config/config";
import { configSchema, AppConfig } from "../config/configSchema";

export function useConfig() {
  const rawConfig = config;
  const parsed = configSchema.parse(rawConfig) as AppConfig;

  return {
    API_URL: parsed.REACT_APP_API_URL,
    FRONTEND_URL: parsed.REACT_APP_FRONTEND_URL,
    WEBSITE_NAME: parsed.REACT_APP_WEBSITE_NAME,
    MAINTENANCE_MODE: parsed.REACT_APP_MAINTENANCE_MODE,
    ENABLE_DEBUG: parsed.REACT_APP_ENABLE_DEBUG,
  };
}
