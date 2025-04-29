// src/App.tsx

import React from "react";
import "./App.css";
import getConfig from "@/config/getConfig";
import Maintenance from "./components/pages/Maintenance/Maintenance";
import Layout from "./components/Layout/Layout";

const App: React.FC = () => {
  const { API_URL, FRONTEND_URL, WEBSITE_NAME, ENABLE_DEBUG, MAINTENANCE_MODE } = getConfig(); // 🔥 ici

  const validateConfig = (): string[] => {
    const errors: string[] = [];
    if (!API_URL) errors.push("REACT_APP_API_URL est manquant.");
    if (!FRONTEND_URL) errors.push("REACT_APP_FRONTEND_URL est manquant.");
    if (!WEBSITE_NAME) errors.push("REACT_APP_WEBSITE_NAME est manquant.");
    return errors;
  };

  const errors = validateConfig();

  if (MAINTENANCE_MODE) {
    return <Maintenance />;
  }

  if (errors.length > 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
        <h1>Erreur de configuration</h1>
        <p>Les erreurs suivantes ont été détectées :</p>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
        <p>Corrigez votre fichier .env avant de continuer.</p>
      </div>
    );
  }

  if (ENABLE_DEBUG) {
    console.log("🧪 Mode debug activé :", { API_URL, FRONTEND_URL, WEBSITE_NAME });
  }

  return <Layout />;
};

export default App;