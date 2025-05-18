// 📁 src/hooks/useResizableHandle.ts
import { useCallback } from "react";
import { useBuilderStore } from "../store/builderStore";
import { useLayoutStore } from "../store/layoutStore";

export function useResizableHandle(
  zone: "header" | "footer",
  surfaceRef: React.RefObject<HTMLDivElement>,
  setGuideY: (y: number | null) => void
) {
  const updateZone = useBuilderStore((state) => state.updateZone);
  const setHeight = useLayoutStore((state) => state.setHeight);

  const startResize = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      const surface = surfaceRef.current;
      if (!surface) return;

      const surfaceTop = surface.getBoundingClientRect().top;
      const initialY = e.clientY;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const currentY = moveEvent.clientY;
        setGuideY(currentY - surfaceTop);
      };

      const handleMouseUp = (upEvent: MouseEvent) => {
        const deltaY = upEvent.clientY - initialY;

        const current = useBuilderStore.getState().zones[zone];
        const newHeight =
          zone === "header"
            ? Math.max(40, current.height + deltaY)
            : Math.max(40, current.height - deltaY);

        updateZone(zone, { height: newHeight });
        setHeight(zone, `${newHeight}px`);
        setGuideY(null);

        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [zone, surfaceRef, updateZone, setHeight, setGuideY]
  );

  return {
    startResize,
  };
}
