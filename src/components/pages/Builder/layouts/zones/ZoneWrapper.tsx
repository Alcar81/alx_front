// 📁 Builder/layouts/zones/ZoneWrapper.tsx

import React, { useState, useCallback, useLayoutEffect } from "react";
import "./Zones.css";

import BlockRenderer from "../../blocks/BlockRenderer";
import ResizeGuideLine from "../../guides/ResizeGuideLine";
import { useResizableHandle } from "../../hooks/useResizableHandle";
import { isResizableZone } from "../../utils/zoneUtils";
import type { LayoutZoneKey, ResizableZoneType } from "../../types/zoneTypes";

import { shallow } from "zustand/shallow";
import { useBuilderPanelsStore } from "../../store/builderPanelsStore";
import type { BlockType } from "../../types/blockTypes";
import { useLayoutStore } from "../../store/layoutStore";

// ✅ Zustand selectors
const selectorState = (s: ReturnType<typeof useBuilderPanelsStore.getState>) => ({
  selectedZone: s.selectedZone,
  hoveredZoneKey: s.hoveredZoneKey,
});
const selectorSetters = (s: ReturnType<typeof useBuilderPanelsStore.getState>) => ({
  setSelectedZone: s.setSelectedZone,
  setHoveredZoneKey: s.setHoveredZoneKey,
});

interface ZoneWrapperProps {
  zoneKey: LayoutZoneKey;
  title: string;
  tag?: keyof JSX.IntrinsicElements;
  surfaceRefZone: React.RefObject<HTMLDivElement>;
  resizable?: boolean;
  children?: React.ReactNode;
  customContainerRef?: React.RefObject<HTMLDivElement>;
}


const ZoneWrapper: React.FC<ZoneWrapperProps> = ({
  zoneKey,
  title,
  tag,
  surfaceRefZone,
  resizable = false,
  children,
  customContainerRef,
}) => {
  const actualTag = tag ?? "div";

  const { selectedZone, hoveredZoneKey } = useBuilderPanelsStore(selectorState, shallow);
  const { setSelectedZone, setHoveredZoneKey } = useBuilderPanelsStore(selectorSetters, shallow);

  const blocks = useBuilderPanelsStore(
    (state) => state.blocks.filter((b) => b.zone === zoneKey),
    shallow
  );
  const addBlock = useBuilderPanelsStore((state) => state.addBlock);

  const [guideY, setGuideY] = useState<number | null>(null);

  // Toujours appeler le hook
  const resize = useResizableHandle(
    (isResizableZone(zoneKey) ? (zoneKey as ResizableZoneType) : "header"),
    surfaceRefZone,
    setGuideY
  );

  // Et filtrer ensuite
  const isZoneResizable = isResizableZone(zoneKey);
  const startResize = isZoneResizable ? resize.startResize : undefined;

  const isSelected = selectedZone === zoneKey;
  const isHovered = hoveredZoneKey === zoneKey;

  const zoneHeight = useLayoutStore((s) =>
    parseInt(s.layout[zoneKey]?.height ?? "0", 10)
  );
  const isBlocked = zoneHeight <= 40;

  const resizeClass = `${zoneKey === "footer" ? "resize-border-top" : "resize-border-bottom"}${
    isBlocked ? " blocked" : ""
  }`;

  const className = [
    `grid-${zoneKey}`,
    "zone-clickable",
    isSelected ? "zone-selected" : "",
    isHovered ? "zone-hovered" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleClickZone = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedZone(zoneKey);
    },
    [setSelectedZone, zoneKey]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const type = e.dataTransfer.getData("application/block-type");
      if (!type || blocks.length > 0) return;
      addBlock(zoneKey, type as BlockType);
    },
    [addBlock, blocks, zoneKey]
  );

  const handleMouseEnter = useCallback(() => {
    if (hoveredZoneKey !== zoneKey) {
      setHoveredZoneKey(zoneKey);
    }
  }, [hoveredZoneKey, zoneKey, setHoveredZoneKey]);

  const handleMouseLeave = useCallback(() => {
    if (hoveredZoneKey === zoneKey) {
      setHoveredZoneKey(null);
    }
  }, [hoveredZoneKey, zoneKey, setHoveredZoneKey]);

  const setZoneRealHeight = useBuilderPanelsStore((s) => s.setZoneRealHeight);
  const zoneRealHeight = useBuilderPanelsStore((s) => s.zoneRealHeights[zoneKey]);
  const zones = useBuilderPanelsStore((s) => s.zones);
  const heightMainAdd = useBuilderPanelsStore((s) =>
    zoneKey === "main" ? s.zones.main.heightMainAdd || 0 : 0
  );

  useLayoutEffect(() => {
    if (zoneKey !== "main") return;
    const ref = customContainerRef?.current ?? surfaceRefZone.current;
    if (!ref) return;

    const height = ref.getBoundingClientRect().height;
    if (!height) return;

    if (Math.abs(zoneRealHeight - height) > 1) {
      setZoneRealHeight("main", height);
    }
  }, [blocks, zoneKey, surfaceRefZone, customContainerRef, setZoneRealHeight, zoneRealHeight]);


  const commonProps = {
    ref: surfaceRefZone,
    className,
    onMouseDown: handleClickZone,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onDragOver: (e: React.DragEvent) => e.preventDefault(),
    onDrop: handleDrop,
  };

  const zoneSizeDisplay = isSelected ? (
    <div className="zone-size-info">
      {zones[zoneKey].width}×
      {zoneKey === "main"
        ? `${zoneRealHeight}${heightMainAdd > 0 ? ` +${heightMainAdd}` : ""}`
        : zoneRealHeight}
    </div>
  ) : null;

  const zoneContent = (
    <>
      {zoneSizeDisplay}
      <span className="zone-title">{title}</span>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} surfaceRefZone={surfaceRefZone} />
      ))}
      {children}
      {resizable && isZoneResizable && (
        <div
          className={resizeClass}
          onMouseDown={startResize}
          title="Redimensionner la zone"
        />
      )}
    </>
  );

  return (
    <>
      {React.createElement(actualTag, commonProps, zoneContent)}
      {resizable && isZoneResizable && guideY !== null && (
        <ResizeGuideLine y={guideY} />
      )}
    </>
  );
};

export default ZoneWrapper;
