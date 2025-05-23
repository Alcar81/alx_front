// 📁 src/utils/snapUtils.ts

export interface SnapOptions {
  threshold: number;
}

/**
 * Trouve la position la plus proche (snappée) pour x et y selon les lignes données.
 * - Si aucune ligne n'est dans la tolérance, la position originale est retournée.
 *
 * @param x - position X actuelle
 * @param y - position Y actuelle
 * @param snapLines - lignes d'ancrage communes (peuvent contenir X et Y)
 * @param options - options de snapping (seuil de tolérance)
 * @returns une nouvelle position snappée
 */
export function getSnappedPosition(
  x: number,
  y: number,
  snapLines: number[],
  options: SnapOptions = { threshold: 8 }
): { x: number; y: number } {
  const snappedX = snapLines.find((line) => Math.abs(line - x) <= options.threshold) ?? x;
  const snappedY = snapLines.find((line) => Math.abs(line - y) <= options.threshold) ?? y;

  return { x: snappedX, y: snappedY };
}
