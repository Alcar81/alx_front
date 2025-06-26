// 📁 Builder/constants/defaultHeights.ts

import type { LayoutZoneKey } from "../types/zoneTypes";

// 🎯 Type élargi : hauteur en pixels ou "auto"
export type LayoutHeightValue = number | "auto";

// 🧱 Hauteurs par défaut pour chaque zone
export const DEFAULT_HEIGHTS: Record<LayoutZoneKey, LayoutHeightValue> = {
  header: 80,
  main: "auto", // ✅ permet l’expansion naturelle du main
  footer: 60,
};

// ⛔️ Hauteurs minimales : uniquement des pixels (donc number)
export const MIN_HEIGHTS: Record<LayoutZoneKey, number> = {
  header: 40,
  main: 200, // Valeur utile si on repasse à un main fixe
  footer: 40,
};

// 🚀 Hauteurs maximales autorisées
export const MAX_HEIGHTS: Record<LayoutZoneKey, number> = {
  header: 200,
  main: 10000,
  footer: 300,
};

// 📌 Liste exhaustive des zones layout
export const ALL_LAYOUT_ZONES: LayoutZoneKey[] = ["header", "main", "footer"];
