import { useCallback, useEffect, useRef, useState } from "react";
import { useBuilderStore } from "../store/builderStore";
import type { ZoneKey } from "../types/zoneTypes";

export const useResizableZone = (zone: ZoneKey, surfaceRef: React.RefObject<HTMLDivElement>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { zones, updateZone, selectedZone, setSelectedZone, setHoveredZone } = useBuilderStore();

  const zoneData = zones[zone];
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // 📦 Début du resize
  const startResize = useCallback((e: React.MouseEvent, dir: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection(dir);
    setIsDragging(false);
    setStartPos({ x: e.clientX, y: e.clientY });
  }, []);

  // 🖱 Début du déplacement
  const startDrag = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection(null);
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  }, []);

  // 🧠 Gestion du mouvement global
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!surfaceRef.current || !zoneData) return;

      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;

      setStartPos({ x: e.clientX, y: e.clientY });

      if (direction) {
        let { width, height } = zoneData;
        if (direction.includes("e")) width += deltaX;
        if (direction.includes("s")) height += deltaY;
        if (direction.includes("w")) width -= deltaX;
        if (direction.includes("n")) height -= deltaY;

        updateZone(zone, {
          width: Math.max(100, width),
          height: Math.max(40, height),
        });
      } else if (isDragging) {
        updateZone(zone, {
          x: Math.max(0, zoneData.x + deltaX),
          y: Math.max(0, zoneData.y + deltaY),
        });
      }
    },
    [zone, zoneData, direction, isDragging, startPos, updateZone, surfaceRef]
  );

  const stopInteraction = useCallback(() => {
    setIsDragging(false);
    setDirection(null);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopInteraction);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopInteraction);
    };
  }, [handleMouseMove, stopInteraction]);

  return {
    containerRef,
    zoneData,
    selectedZone,
    isSelected: selectedZone === zone,
    setSelectedZone,
    setHoveredZone,
    startDrag,
    startResize,
  };
};
