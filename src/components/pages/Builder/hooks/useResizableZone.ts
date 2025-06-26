// 📁 src/hooks/useResizableZone.ts

import { useCallback, useEffect, useRef, useState } from "react";
import { useBuilderPanelsStore } from "../store/builderPanelsStore";
import type { LayoutZoneKey } from "../types/zoneTypes";

export const useResizableZone = (
  zone: LayoutZoneKey,
  surfaceRef: React.RefObject<HTMLDivElement>
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { zones, updateZone, selectedZone, setSelectedZone, setHoveredZone } =
    useBuilderPanelsStore();

  const zoneData = zones[zone];
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const startResize = useCallback((e: React.MouseEvent, dir: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection(dir);
    setIsDragging(false);
    setStartPos({ x: e.clientX, y: e.clientY });
  }, []);

  const startDrag = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection(null);
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!surfaceRef.current || !zoneData) return;

      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;

      setStartPos({ x: e.clientX, y: e.clientY });

      if (direction) {
        let { width, height } = zoneData;
        let numericHeight = height === "auto" ? 0 : height;

        if (direction.includes("e")) width += deltaX;
        if (direction.includes("s")) numericHeight += deltaY;
        if (direction.includes("w")) width -= deltaX;
        if (direction.includes("n")) numericHeight -= deltaY;

        updateZone(zone, {
          width: Math.max(100, width),
          height: Math.max(40, numericHeight),
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

  // ✅ Nouvelle fonction d’ajustement manuel (+ / –)
  const adjustZoneHeight = useCallback(
    (delta: number) => {
      if (!zoneData || zoneData.height === "auto") return;
      const newHeight = Math.max(40, zoneData.height + delta);
      updateZone(zone, { height: newHeight });
    },
    [zone, zoneData, updateZone]
  );

  return {
    containerRef,
    zoneData,
    selectedZone,
    isSelected: selectedZone === zone,
    setSelectedZone,
    setHoveredZone,
    startDrag,
    startResize,
    adjustZoneHeight, // 👈 À utiliser dans MainExpandControls ou ailleurs
  };
};
