// 📁 src/hooks/useResizableHandle.ts

import { useCallback } from "react";
import { useLayoutStore } from "../store/layoutStore";

type ZoneType = "header" | "footer";

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

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const clientY = moveEvent.clientY;
        let newY = 0;

        if (zone === "header") {
          newY = Math.max(40, clientY - surfaceRect.top);
        } else if (zone === "footer") {
          const surfaceBottom = surfaceRect.bottom;
          const newHeight = Math.max(40, surfaceBottom - clientY);
          newY = surfaceBottom - newHeight;
        }

        setGuideY(newY);
      };

      const handleMouseUp = (moveEvent: MouseEvent) => {
        const setHeight = useLayoutStore.getState().setHeight; // 👈 déplacé ici
        const clientY = moveEvent.clientY;

        if (zone === "header") {
          const height = Math.max(40, clientY - surfaceRect.top);
          setHeight(zone, `${height}px`);
        } else if (zone === "footer") {
          const surfaceBottom = surfaceRect.bottom;
          const height = Math.max(40, surfaceBottom - clientY);
          setHeight(zone, `${height}px`);
        }

        setGuideY(null);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [zone, surfaceRef, setGuideY] // ✅ plus de warning maintenant
  );

  return { startResize };
}
