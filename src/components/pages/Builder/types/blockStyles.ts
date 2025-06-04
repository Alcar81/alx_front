// Builder/types/blockStyle.ts

import { CSSProperties } from "react";

/**
 * Style visuel et positionnel appliqué à un bloc affichable.
 * Étend les propriétés CSS classiques tout en forçant les champs clés nécessaires à la mise en page.
 */
export interface BlockStyle extends CSSProperties {
  // 🔒 Champs requis pour positionnement et redimensionnement
  top: number;
  left: number;
  width: number;
  height: number;

  // 🎯 Optionnel mais typé précisément
  position?: "absolute" | "relative" | "fixed";

  // 🔄 Champs bonus pour transformation dynamique
  rotation?: number; // degré de rotation (0-360)
  zIndex?: number; // ordre visuel
  opacity?: number; // transparence (0 à 1)
  borderRadius?: number; // arrondi en px
  boxShadow?: string; // ex: "0 2px 6px rgba(0,0,0,0.2)"
  backgroundColor?: string; // couleur de fond ex: "#fff"
}
