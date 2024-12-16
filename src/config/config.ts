const config = {
  REACT_APP_API_URL: process.env.REACT_APP_API_URL || "https://dev.alxmultimedia.com/api",
  REACT_APP_WEBSITE_NAME: process.env.REACT_APP_WEBSITE_NAME || "alxmultimedia",
  REACT_APP_FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL || "https://dev.alxmultimedia.com",
  
  // Valeurs par défaut hardcodées
  REACT_APP_ENABLE_DEBUG: false, // "true" pour mode debug
  REACT_APP_MAINTENANCE_MODE: false, // "true" pour maintenance 
};

export default config;