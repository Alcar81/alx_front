import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Récupération du nonce injecté par le backend
const nonce = (window as any).__NONCE__ || "";

if (!nonce) {
  console.warn(
    "Aucun nonce trouvé. Cela pourrait poser problème avec la politique CSP. Assurez-vous que le backend injecte correctement le nonce dans le HTML."
  );
}

// Création du cache Emotion avec le nonce
const cache = createCache({
  key: "css",
  nonce: nonce,
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
