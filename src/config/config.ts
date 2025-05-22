// 📁 src/config/config.ts

const config = {
  REACT_APP_API_URL: process.env.REACT_APP_API_URL || "",
  REACT_APP_FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL || "",
  REACT_APP_WEBSITE_NAME: process.env.REACT_APP_WEBSITE_NAME || "",
  REACT_APP_MAINTENANCE_MODE: process.env.REACT_APP_MAINTENANCE_MODE === "true",
  REACT_APP_ENABLE_DEBUG: process.env.REACT_APP_ENABLE_DEBUG === "true",
};

export default config;
