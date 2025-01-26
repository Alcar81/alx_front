import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Récupération du nonce injecté par le backend
const nonce = (window as any).__NONCE__;

if (!nonce) {
  console.error(
    "Aucun nonce trouvé. Assurez-vous que le backend injecte correctement le nonce dans le fichier HTML avec le placeholder __NONCE__."
  );
} else {
  console.log("Nonce détecté :", nonce);
}

// Création du cache Emotion avec le nonce
const cache = createCache({
  key: "css", // Nom de clé du cache
  nonce: nonce || "", // Utilisation du nonce ou d'un fallback vide
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <CacheProvider value={cache}>
      <App />
    </CacheProvider>
  </React.StrictMode>
);

// Mesure des performances de l'application
reportWebVitals();
