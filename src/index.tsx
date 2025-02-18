import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// 🔄 Récupération du nonce injecté par le backend
let nonce: string | undefined;

try {
  nonce = (window as any).__NONCE__;

  if (!nonce) {
    throw new Error("⚠️ Aucun nonce trouvé ! Vérifiez que le backend injecte bien le nonce.");
  } else {
    console.log("✅ Nonce détecté :", nonce);
  }
} catch (error) {
  console.error(error);
  nonce = undefined; // Assurer une valeur définie pour éviter des erreurs
}

// 📦 Création du cache Emotion avec le nonce (si disponible)
const cache = createCache({
  key: "mui",
  nonce: nonce || "", // Éviter une erreur si le nonce est absent
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
