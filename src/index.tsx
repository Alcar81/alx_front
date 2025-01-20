// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Récupérez le nonce injecté par le backend
const nonce = (window as any).__NONCE__;

// Vérifiez si le nonce est défini
if (!nonce) {
  console.warn(
    "Aucun nonce trouvé dans la configuration du backend. Assurez-vous que le nonce est correctement injecté via __NONCE__."
  );
}

// Créez un cache Emotion configuré avec le nonce
const cache = createCache({
  key: "css",
  nonce: nonce, // Utilise le nonce pour permettre les styles inline sécurisés
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {nonce ? (
      // Utilisation de CacheProvider si le nonce est défini
      <CacheProvider value={cache}>
        <App />
      </CacheProvider>
    ) : (
      // Affiche un message d'erreur si le nonce est absent
      <div>
        <h1>Erreur de configuration</h1>
        <p>Le nonce requis pour sécuriser les styles n'est pas disponible.</p>
      </div>
    )}
  </React.StrictMode>
);

// Mesure des performances

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
