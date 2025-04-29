// 📁 src/setupTests.ts

// ✅ Setup pour les assertions personnalisées
import "dotenv/config"; 
import "@testing-library/jest-dom";

// ✅ Mock de l'environnement d'exécution
process.env.REACT_APP_API_URL = process.env.REACT_APP_API_URL || "http://localhost:7001/api";
process.env.REACT_APP_FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
process.env.REACT_APP_WEBSITE_NAME = process.env.REACT_APP_WEBSITE_NAME || "TestApp";
process.env.REACT_APP_MAINTENANCE_MODE = process.env.REACT_APP_MAINTENANCE_MODE || "false";
process.env.REACT_APP_ENABLE_DEBUG = process.env.REACT_APP_ENABLE_DEBUG || "false";

// (optionnel) Pour capter des erreurs non catchées
process.on("unhandledRejection", (reason, promise) => {
  console.error("⚠️ Unhandled Rejection during tests:", reason);
});
process.on("uncaughtException", (error) => {
  console.error("⚠️ Uncaught Exception during tests:", error);
});
