// 📁 Builder/types/zoneTypes.ts

// ✅ Zones pouvant être redimensionnées directement
export type ResizableZoneType = "header" | "footer";

// ✅ Zones utilisées dans Zustand (uniquement les zones "réelles")
export type LayoutZoneKey = "header" | "main" | "footer";

// ✅ Zones utilisées dans les composants UI (permet de distinguer main-inline visuellement)
export type ZoneKey = LayoutZoneKey | "main-inline";

// ✅ Mode de rendu du footer
export type FooterMode = "fixed" | "inline" | "none";

// ✅ Vérifie si une clé est une vraie zone logique (Zustand)
export const isZoneKey = (key: string): key is LayoutZoneKey =>
  ["header", "main", "footer"].includes(key);

// ✅ Mappage des noms lisibles
export const ZONE_LABELS: Record<LayoutZoneKey, string> = {
  header: "En-tête",
  main: "Contenu principal",
  footer: "Pied de page",
};

// ✅ Permet de convertir "main-inline" vers "main"
export const getCanonicalZoneKey = (zoneKey: ZoneKey): LayoutZoneKey => {
  return zoneKey === "main-inline" ? "main" : zoneKey;
};
