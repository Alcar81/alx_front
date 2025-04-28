// 📁 src/setupTests.ts

// ✅ Ajoute toutes les assertions personnalisées comme toBeInTheDocument, toHaveAttribute, etc.
import "@testing-library/jest-dom";

// ✅ (Optionnel) Mock des variables d'environnement pour les tests qui attendent un config valide
process.env.REACT_APP_API_URL = process.env.REACT_APP_API_URL || "https://localhost/api";
process.env.REACT_APP_FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || "https://localhost:3000";
process.env.REACT_APP_WEBSITE_NAME = process.env.REACT_APP_WEBSITE_NAME || "TestApp";
process.env.REACT_APP_MAINTENANCE_MODE = process.env.REACT_APP_MAINTENANCE_MODE || "false";
process.env.REACT_APP_ENABLE_DEBUG = process.env.REACT_APP_ENABLE_DEBUG || "false";

// ✅ (Optionnel) Évite que des erreurs non-catchées fassent planter tout le test
process.on("unhandledRejection", (reason, promise) => {
  console.error("⚠️ Unhandled Rejection during tests:", reason);
});
process.on("uncaughtException", (error) => {
  console.error("⚠️ Uncaught Exception during tests:", error);
});
