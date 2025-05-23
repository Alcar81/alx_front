// 📁 src/utils/snapping.ts

import { SnapOptions } from "./snapHelpers";

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
