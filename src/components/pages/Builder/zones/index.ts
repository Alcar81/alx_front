// src/components/pages/Builder/zones/index.ts
// this snippet
// is a module that exports three components: HeaderZone, MainZone, and FooterZone.
// These components are used to create a grid layout for a page builder application.
// Each component is imported from its respective file and then exported as a named export.
// This allows other parts of the application to import these components easily.

// Zone fixe toujours en haut
export { default as HeaderZone } from "./HeaderZone";

// Zone de contenu principal (centré)
export { default as MainZone } from "./MainZone";

// Zone fixe toujours en bas
export { default as FooterZone } from "./FooterZone";
