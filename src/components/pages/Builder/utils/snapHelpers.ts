// 📁 src/utils/snapHelpers.ts

export interface SnapOptions {
  threshold: number;
}

// Exemple : retourne les lignes magnétiques actives (marges, milieu, etc.)
export function getSnapLines(surfaceWidth: number, surfaceHeight: number): number[] {
  return [0, surfaceWidth / 2, surfaceWidth, surfaceHeight / 2, surfaceHeight];
}

// Utilitaire (pas utilisé tout de suite, mais utile si distance vectorielle)
export function distanceToLine(pos: number, line: number): number {
  return Math.abs(pos - line);
}

// Détecte si une position est proche d’un point magnétique
export function isNearSnapLine(pos: number, line: number, threshold: number): boolean {
  return distanceToLine(pos, line) <= threshold;
}
