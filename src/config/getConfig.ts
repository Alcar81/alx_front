export default function getConfig() {
  return {
    API_URL: process.env.REACT_APP_API_URL || "",
    FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL || "",
    WEBSITE_NAME: process.env.REACT_APP_WEBSITE_NAME || "",
    MAINTENANCE_MODE: process.env.REACT_APP_MAINTENANCE_MODE === "true",
    ENABLE_DEBUG: process.env.REACT_APP_ENABLE_DEBUG === "true",
  };
}
