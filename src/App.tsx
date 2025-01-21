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

  if (errors.length > 0) {
    console.error("Erreurs de configuration détectées :", errors);
  }

  return errors;
};

const App: React.FC = () => {
  const isMaintenance = config.REACT_APP_MAINTENANCE_MODE;
  const errors = validateConfig();

  // Si le mode maintenance est activé, affiche la page de maintenance
  if (isMaintenance) {
    return <Maintenance />;
  }

  // Si des erreurs de configuration sont détectées, affiche une page d'erreur explicite
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

  // Si le mode debug est activé, affiche la configuration dans la console
  if (config.REACT_APP_ENABLE_DEBUG) {
    console.log("Mode debug activé. Configuration actuelle :", config);
  }

  // Charge le layout principal si tout est correct
  return <Layout />;
};

export default App;
