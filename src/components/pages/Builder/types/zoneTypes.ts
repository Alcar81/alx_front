// 📁 src/types/zoneTypes.ts

/**
 * Les zones structurelles du layout de page.
 */
// 📁 Builder/types/zoneTypes.ts

export type ZoneType = "header" | "footer"; // Zones redimensionnables
export type ZoneKey = "header" | "main" | "footer"; // Toutes les zones possibles
export const isZoneKey = (key: string): key is ZoneKey =>
  ["header", "main", "footer"].includes(key);

/**
 * Clé lisible ou utilisée dans des composants visuels (ex: menu ou UI)
 */
export const ZONE_LABELS: Record<ZoneKey, string> = {
  header: "En-tête",
  main: "Contenu principal",
  footer: "Pied de page",
};
