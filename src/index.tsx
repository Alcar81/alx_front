// index.tsx */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Récupérez le nonce injecté par le backend
const nonce = (window as any).__NONCE__;

// Créez un cache Emotion configuré avec le nonce
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

// Mesure des performances

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
