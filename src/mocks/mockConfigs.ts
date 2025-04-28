// 📁 src/mocks/mockConfigs.ts

// ✅ Définir le type MockConfig pour mieux typer les objets
export interface MockConfig {
  REACT_APP_API_URL?: string;
  REACT_APP_FRONTEND_URL?: string;
  REACT_APP_WEBSITE_NAME?: string;
  REACT_APP_MAINTENANCE_MODE?: boolean;
  REACT_APP_ENABLE_DEBUG?: boolean;
}

// ✅ Exporter tes jeux de configurations de tests
const mockConfigs = {
  maintenanceOn: {
    REACT_APP_API_URL: "https://api.example.com",
    REACT_APP_FRONTEND_URL: "https://frontend.example.com",
    REACT_APP_WEBSITE_NAME: "AlxMultimedia",
    REACT_APP_MAINTENANCE_MODE: true,
    REACT_APP_ENABLE_DEBUG: false,
  },
  maintenanceOff: {
    REACT_APP_API_URL: "https://api.example.com",
    REACT_APP_FRONTEND_URL: "https://frontend.example.com",
    REACT_APP_WEBSITE_NAME: "AlxMultimedia",
    REACT_APP_MAINTENANCE_MODE: false,
    REACT_APP_ENABLE_DEBUG: false,
  },
  missingApiUrl: {
    REACT_APP_API_URL: undefined,
    REACT_APP_FRONTEND_URL: "https://frontend.example.com",
    REACT_APP_WEBSITE_NAME: "AlxMultimedia",
    REACT_APP_MAINTENANCE_MODE: false,
    REACT_APP_ENABLE_DEBUG: false,
  },
  debugMode: {
    REACT_APP_API_URL: "https://api.example.com",
    REACT_APP_FRONTEND_URL: "https://frontend.example.com",
    REACT_APP_WEBSITE_NAME: "AlxMultimedia",
    REACT_APP_MAINTENANCE_MODE: false,
    REACT_APP_ENABLE_DEBUG: true,
  },
};

export default mockConfigs;
