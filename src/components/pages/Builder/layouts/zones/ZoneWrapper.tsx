// 📁 Builder/layouts/zones/ZoneWrapper.tsx

import React, { useState } from "react";
import "./Zones.css";

import BlockRenderer from "../../blocks/BlockRenderer";
import ResizeGuideLine from "../../guides/ResizeGuideLine";
import { useResizableHandle } from "../../hooks/useResizableHandle";
import { isResizableZone } from "../../utils/zoneUtils";
import type { ZoneKey } from "../../types/zoneTypes";

import { shallow } from "zustand/shallow";
import { useBuilderStore, BuilderState } from "../../store/builderStore";
import { usePageBuilderStore } from "../../store/pageBuilderStore";
import type { BlockType } from "../../types/blockTypes";
import { useLayoutStore } from "../../store/layoutStore";

// ✅ Sélecteurs optimisés Zustand
const selectorState = (s: BuilderState) => ({
  selectedZone: s.selectedZone,
  hoveredZone: s.hoveredZone,
});
const selectorSetters = (s: BuilderState) => ({
  setSelectedZone: s.setSelectedZone,
  setHoveredZone: s.setHoveredZone,
});

interface ZoneWrapperProps {
  zoneKey: ZoneKey;
  title: string;
  tag: "header" | "main" | "footer";
  surfaceRefZone: React.RefObject<HTMLDivElement>;
  resizable?: boolean;
}

const ZoneWrapper: React.FC<ZoneWrapperProps> = ({
  zoneKey,
  title,
  tag,
  surfaceRefZone,
  resizable = false,
}) => {
  const { selectedZone, hoveredZone } = useBuilderStore(selectorState, shallow);
  const { setSelectedZone, setHoveredZone } = useBuilderStore(selectorSetters, shallow);

  const blocks = usePageBuilderStore(
    (state) => state.blocks.filter((b) => b.zone === zoneKey),
    shallow
  );

  const addBlock = usePageBuilderStore((state) => state.addBlock);

  const [guideY, setGuideY] = useState<number | null>(null);
  const resize = useResizableHandle(
    isResizableZone(zoneKey) ? zoneKey : "header",
    surfaceRefZone,
    setGuideY
  );

  const startResize = isResizableZone(zoneKey) ? resize.startResize : undefined;
  const isSelected = selectedZone === zoneKey;
  const isHovered = hoveredZone === zoneKey;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("application/block-type");
    if (!type || blocks.length > 0) return;
    addBlock(zoneKey, type as BlockType);
  };

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
    isHovered && !isSelected ? "zone-hovered" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const commonProps = {
    ref: surfaceRefZone,
    className,
    onClick: () => {
      if (isResizableZone(zoneKey) && selectedZone !== zoneKey) {
        setSelectedZone(zoneKey);
      }
    },
    onMouseEnter: () => {
      if (hoveredZone !== zoneKey) setHoveredZone(zoneKey);
    },
    onMouseLeave: () => {
      if (hoveredZone === zoneKey) setHoveredZone(null);
    },
    onDragOver: (e: React.DragEvent) => e.preventDefault(),
    onDrop: handleDrop,
  };

  const zoneContent = (
    <>
      <span className="zone-title">{title}</span>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} surfaceRefZone={surfaceRefZone} />
      ))}
      {resizable && isResizableZone(zoneKey) && (
        <div className={resizeClass} onMouseDown={startResize} title="Redimensionner la zone" />
      )}
    </>
  );

  return (
    <>
      {React.createElement(tag, commonProps, zoneContent)}
      {resizable && isResizableZone(zoneKey) && guideY !== null && (
        <ResizeGuideLine y={guideY} />
      )}
    </>
  );
};

export default ZoneWrapper;
