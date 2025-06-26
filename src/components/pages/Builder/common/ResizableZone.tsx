// 📁 src/components/pages/Builder/common/ResizableZone.tsx

import React from "react";
import "./ResizableZone.css";
import { useResizableZone } from "../hooks/useResizableZone";
import type { LayoutZoneKey } from "../types/zoneTypes";

interface ResizableZoneProps {
  zone: LayoutZoneKey;
  surfaceRef: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
}

const ResizableZone: React.FC<ResizableZoneProps> = ({ zone, surfaceRef, children }) => {
  const {
    containerRef,
    zoneData,
    isSelected,
    setSelectedZone,
    setHoveredZone,
    startDrag,
    startResize,
  } = useResizableZone(zone, surfaceRef);

  return (
    <div
      ref={containerRef}
      className={`resizable-zone${isSelected ? " selected" : ""}`}
      style={{
        left: zoneData.x,
        top: zoneData.y,
        width: zoneData.width,
        height: zoneData.height,
      }}
      onClick={() => setSelectedZone(zone)}
      onMouseEnter={() => setHoveredZone(zone)}
      onMouseLeave={() => setHoveredZone(null)}
    >
      {/* ✅ Contenu intégré */}
      {children}

      {/* 🟢 Drag en haut */}
      {isSelected && (
        <div className="zone-drag-handle" onMouseDown={startDrag} />
      )}

      {/* ↘️ Resize coin bas-droit */}
      {isSelected && (
        <div
          className="resize-handle se"
          onMouseDown={(e) => startResize(e, "se")}
        />
      )}
    </div>
  );
};

export default ResizableZone;
