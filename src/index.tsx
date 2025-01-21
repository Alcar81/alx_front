import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Récupération du nonce injecté par le backend
const nonce = (window as any).__NONCE__;

// Vérification et message clair en cas d'absence du nonce
if (!nonce) {
  console.warn(
    "Aucun nonce trouvé. Assurez-vous que le backend injecte correctement le nonce dans le HTML avec le placeholder __NONCE__."
  );
}

// Création du cache Emotion avec le nonce
const cache = createCache({
  key: "css",
  nonce: nonce || "", // Utilise un nonce vide comme fallback pour éviter les erreurs
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {nonce ? (
      // Si le nonce est présent, utilise CacheProvider pour Emotion
      <CacheProvider value={cache}>
        <App />
      </CacheProvider>
    ) : (
      // Affiche un message explicite si le nonce est absent
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1 style={{ color: "red" }}>Erreur de configuration</h1>
        <p>
          Le nonce requis pour sécuriser les styles est manquant. Veuillez
          vérifier la configuration du backend et le fichier HTML généré.
        </p>
      </div>
    )}
  </React.StrictMode>
);

// Mesure des performances de l'application
reportWebVitals();
