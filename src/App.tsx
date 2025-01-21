import React from "react";
import "./App.css";
import config from "./config/config";
import Maintenance from "./components/pages/Maintenance/Maintenance";
import Layout from "./components/Layout/Layout";

// Fonction utilitaire pour valider les configurations importantes
const validateConfig = (): string[] => {
  const errors: string[] = [];

  if (!config.REACT_APP_API_URL) {
    errors.push("REACT_APP_API_URL n'est pas défini dans le fichier .env ou config.ts");
  }
  if (!config.REACT_APP_FRONTEND_URL) {
    errors.push("REACT_APP_FRONTEND_URL n'est pas défini dans le fichier .env ou config.ts");
  }
  if (!config.REACT_APP_WEBSITE_NAME) {
    errors.push("REACT_APP_WEBSITE_NAME n'est pas défini dans le fichier .env ou config.ts");
  }

  return errors;
};

const App: React.FC = () => {
  const isMaintenance = config.REACT_APP_MAINTENANCE_MODE;
  const errors = validateConfig();

  if (isMaintenance) {
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
        <p>Veuillez corriger ces erreurs avant de continuer.</p>
      </div>
    );
  }

  if (config.REACT_APP_ENABLE_DEBUG) {
    console.log("Mode debug activé. Configuration actuelle :", config);
  }

  return <Layout />;
};

export default App;
