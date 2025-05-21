// 📁 src/mocks/mockConfigs.ts

// ✅ Définir le type MockConfig pour mieux typer les objets
export interface MockConfig {
  API_URL?: string;
  FRONTEND_URL?: string;
  WEBSITE_NAME?: string;
  MAINTENANCE_MODE?: boolean;
  ENABLE_DEBUG?: boolean;
}

// ✅ Exporter tes jeux de configurations de tests
const mockConfigs: Record<string, MockConfig> = {
  maintenanceOn: {
    API_URL: "https://api.example.com",
    FRONTEND_URL: "https://frontend.example.com",
    WEBSITE_NAME: "AlxMultimedia",
    MAINTENANCE_MODE: true,
    ENABLE_DEBUG: false,
  },
  maintenanceOff: {
    API_URL: "https://api.example.com",
    FRONTEND_URL: "https://frontend.example.com",
    WEBSITE_NAME: "AlxMultimedia",
    MAINTENANCE_MODE: false,
    ENABLE_DEBUG: false,
  },
  missingApiUrl: {
    FRONTEND_URL: "https://frontend.example.com",
    WEBSITE_NAME: "AlxMultimedia",
    MAINTENANCE_MODE: false,
    ENABLE_DEBUG: false,
  },
  debugMode: {
    API_URL: "https://api.example.com",
    FRONTEND_URL: "https://frontend.example.com",
    WEBSITE_NAME: "AlxMultimedia",
    MAINTENANCE_MODE: false,
    ENABLE_DEBUG: true,
  },
};

export default mockConfigs;
