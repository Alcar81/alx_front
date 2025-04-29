// 📁 src/App.tsx

import React from "react";
import "./App.css";
import { useConfig } from "./hooks/useConfig";
import Maintenance from "./components/pages/Maintenance/Maintenance";
import Layout from "./components/Layout/Layout";

const App: React.FC = () => {
  const {
    REACT_APP_API_URL,
    REACT_APP_FRONTEND_URL,
    REACT_APP_WEBSITE_NAME,
    REACT_APP_ENABLE_DEBUG,
    REACT_APP_MAINTENANCE_MODE,
  } = useConfig();

  const validateConfig = (): string[] => {
    const errors: string[] = [];
    if (!REACT_APP_API_URL) errors.push("REACT_APP_API_URL est manquant.");
    if (!REACT_APP_FRONTEND_URL) errors.push("REACT_APP_FRONTEND_URL est manquant.");
    if (!REACT_APP_WEBSITE_NAME) errors.push("REACT_APP_WEBSITE_NAME est manquant.");
    return errors;
  };

  const errors = validateConfig();

  if (REACT_APP_MAINTENANCE_MODE) {
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

  if (REACT_APP_ENABLE_DEBUG) {
    console.log("🧪 Mode debug activé :", {
      REACT_APP_API_URL,
      REACT_APP_FRONTEND_URL,
      REACT_APP_WEBSITE_NAME,
      REACT_APP_ENABLE_DEBUG,
      REACT_APP_MAINTENANCE_MODE,
    });
  }

  return <Layout />;
};

export default App;
