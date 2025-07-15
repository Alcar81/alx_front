// 📁 Builder/hooks/useResizableZone.ts

import { useCallback, useEffect, useRef, useState } from "react";
import { useBuilderPanelsStore } from "../store/builderPanelsStore";
import { useLayoutStore } from "../store/layoutStore";
import type { LayoutZoneKey } from "../types/zoneTypes";

export const useResizableZone = (
  zone: LayoutZoneKey,
  surfaceRef: React.RefObject<HTMLDivElement>,
  customContainerRef?: React.RefObject<HTMLDivElement> // ✅ pour footer-container
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { zones, updateZone, selectedZone, setSelectedZone, setHoveredZone, setZoneRealHeight } =
    useBuilderPanelsStore();

  const footerMode = useLayoutStore((state) => state.layout.footerMode);
  const isInlineMode = zone === "main" && footerMode === "inline";

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

  const updateRealMainHeight = useCallback(() => {
    setTimeout(() => {
      const footer = surfaceRef.current?.querySelector("#footer-container") as HTMLDivElement;
      const main = surfaceRef.current?.querySelector("#main-container") as HTMLDivElement;

      const footerH = footer?.getBoundingClientRect().height || 0;
      const mainH = main?.getBoundingClientRect().height || 0;

      setZoneRealHeight("main", footerH + mainH);
    }, 0);
  }, [surfaceRef, setZoneRealHeight]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!surfaceRef.current || !zoneData) return;

      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;
      setStartPos({ x: e.clientX, y: e.clientY });

      if (direction) {
        let { width, height } = zoneData;
        let numericHeight = height === "auto" ? 0 : height;

        // Redimensionnement horizontal
        if (direction.includes("e")) width += deltaX;
        if (direction.includes("w")) width -= deltaX;

        // Redimensionnement vertical
        if (direction.includes("s")) numericHeight += deltaY;
        if (direction.includes("n")) numericHeight -= deltaY;

        numericHeight = Math.max(40, numericHeight);

        if (isInlineMode && customContainerRef?.current) {
          customContainerRef.current.style.height = `${numericHeight}px`;
          updateRealMainHeight();
          return;
        }

        updateZone(zone, {
          width: Math.max(100, width),
          height: numericHeight,
        });
      } else if (isDragging) {
        updateZone(zone, {
          x: Math.max(0, zoneData.x + deltaX),
          y: Math.max(0, zoneData.y + deltaY),
        });
      }
    },
    [
      zone,
      zoneData,
      direction,
      isDragging,
      startPos,
      updateZone,
      surfaceRef,
      isInlineMode,
      customContainerRef,
      updateRealMainHeight,
    ]
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

  const adjustZoneHeight = useCallback(
    (delta: number) => {
      if (!zoneData) return;

      if (isInlineMode && customContainerRef?.current) {
        const current = customContainerRef.current;
        const prevHeight =
          parseInt(current.style.height || "") || current.getBoundingClientRect().height || 0;
        const newHeight = Math.max(40, prevHeight + delta);
        current.style.height = `${newHeight}px`;
        updateRealMainHeight();
        return;
      }

      if (zoneData.height === "auto") return;
      const newHeight = Math.max(40, zoneData.height + delta);
      updateZone(zone, { height: newHeight });
    },
    [zoneData, zone, isInlineMode, customContainerRef, updateZone, updateRealMainHeight]
  );

  // ✅ Nouveau : ajuster main-container directement
  const adjustMainContainerHeight = useCallback(
    (delta: number) => {
      const main = surfaceRef.current?.querySelector("#main-container") as HTMLDivElement;
      if (!main) return;

      const currentHeight =
        parseInt(main.style.height || "") || main.getBoundingClientRect().height || 0;
      const newHeight = Math.max(40, currentHeight + delta);
      main.style.height = `${newHeight}px`;

      updateRealMainHeight();
    },
    [surfaceRef, updateRealMainHeight]
  );

  // ✅ Nouveau : ajuster footer-container directement
  const adjustFooterContainerHeight = useCallback(
    (delta: number) => {
      const footer = surfaceRef.current?.querySelector("#footer-container") as HTMLDivElement;
      if (!footer) return;

      const currentHeight =
        parseInt(footer.style.height || "") || footer.getBoundingClientRect().height || 0;
      const newHeight = Math.max(40, currentHeight + delta);
      footer.style.height = `${newHeight}px`;

      updateRealMainHeight();
    },
    [surfaceRef, updateRealMainHeight]
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
    adjustZoneHeight,
    adjustMainContainerHeight,
    adjustFooterContainerHeight,
  };
};
