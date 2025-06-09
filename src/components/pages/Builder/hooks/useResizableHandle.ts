// 📁 src/hooks/useResizableHandle.ts

import { useCallback } from "react";
import { useLayoutStore } from "../store/layoutStore";

// ✅ Type exporté pour usage global
export type ZoneType = "header" | "main" | "footer";

export function useResizableHandle(
  zone: ZoneType,
  surfaceRef: React.RefObject<HTMLDivElement>,
  setGuideY: (value: number | null) => void
) {
  const startResize = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      const surfaceRect = surfaceRef.current?.getBoundingClientRect();
      if (!surfaceRect) return;

      const surfaceTop = surfaceRect.top;
      const surfaceBottom = surfaceRect.bottom;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const currentY = moveEvent.clientY;
        let newGuideY = 0;

        if (zone === "header") {
          newGuideY = Math.max(surfaceTop + 40, currentY);
        } else if (zone === "footer") {
          newGuideY = Math.min(surfaceBottom - 40, currentY);
        }

        setGuideY(newGuideY);
      };

      const handleMouseUp = (moveEvent: MouseEvent) => {
        const currentY = moveEvent.clientY;
        const setHeight = useLayoutStore.getState().setHeight;

        if (zone === "header") {
          const height = Math.max(40, currentY - surfaceTop);
          setHeight(zone, `${height}px`);
        } else if (zone === "footer") {
          const height = Math.max(40, surfaceBottom - currentY);
          setHeight(zone, `${height}px`);
        }

        setGuideY(null);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [zone, surfaceRef, setGuideY]
  );

  return { startResize };
}
