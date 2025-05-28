// 📁 src/hooks/useSnapping.ts

import { useEffect, useState } from "react";
import { getSnapLines } from "../utils/snapHelpers";
import { getSnappedPosition } from "../utils/snapping";

export function useSnapping(x: number, y: number, surfaceWidth: number, surfaceHeight: number) {
  const [snapped, setSnapped] = useState({ x, y });

  useEffect(() => {
    const lines = getSnapLines(surfaceWidth, surfaceHeight);
    const result = getSnappedPosition(x, y, lines);
    setSnapped(result);
  }, [x, y, surfaceWidth, surfaceHeight]);

  return snapped;
}
