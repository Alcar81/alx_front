// src/config/config.js
const config = {
  REACT_APP_API_URL: process.env.REACT_APP_API_URL || "https://dev.alxmultimedia.com/api",
  REACT_APP_WEBSITE_NAME: process.env.REACT_APP_WEBSITE_NAME || "alxmultimedia",
  REACT_APP_ENABLE_DEBUG: process.env.REACT_APP_ENABLE_DEBUG === "true",
  REACT_APP_FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL || "https://dev.alxmultimedia.com",
  REACT_APP_MAINTENANCE_MODE: process.env.REACT_APP_MAINTENANCE_MODE === "true", // Dynamique
};

export default config;
