// 📁 src/setupTests.ts

// ✅ Setup pour les assertions personnalisées
import "dotenv/config";
import "@testing-library/jest-dom";

// (optionnel) Gestion erreurs non catchées
process.on("unhandledRejection", (reason, promise) => {
  console.error("⚠️ Unhandled Rejection during tests:", reason);
});
process.on("uncaughtException", (error) => {
  console.error("⚠️ Uncaught Exception during tests:", error);
});
