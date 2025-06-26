// 📁 Builder/types/zoneTypes.ts

export type ZoneType = "header" | "footer"; // Zones redimensionnables

export type LayoutZoneKey = "header" | "main" | "footer"; // Toutes les zones possibles

export type FooterMode = "fixed" | "inline" | "none";

export const isZoneKey = (key: string): key is LayoutZoneKey =>
  ["header", "main", "footer"].includes(key);

/**
 * Clé lisible ou utilisée dans des composants visuels (ex: menu ou UI)
 */
export const ZONE_LABELS: Record<LayoutZoneKey, string> = {
  header: "En-tête",
  main: "Contenu principal",
  footer: "Pied de page",
};
