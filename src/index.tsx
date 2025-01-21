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
    "Aucun nonce trouvé. Assurez-vous que le backend injecte correctement le nonce dans le HTML avec le placeholder __NONCE__."
  );
}

// Création du cache Emotion avec le nonce
const cache = createCache({
  key: "css",
  nonce: nonce || "", // Utilise un nonce vide comme fallback
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

reportWebVitals();
