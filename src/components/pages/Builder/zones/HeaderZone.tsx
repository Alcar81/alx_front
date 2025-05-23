// 📁 src/components/pages/Builder/zones/HeaderZone.tsx

import React, { useRef, useState } from "react";
import "./Zones.css";
import { useBuilderStore } from "../../../../store/builderStore";
import { useResizableHandle } from "../../../../hooks/useResizableHandle";
import ResizeGuideLine from "../guides/ResizeGuideLine";

const HeaderZone: React.FC<{ surfaceRef: React.RefObject<HTMLDivElement> }> = ({ surfaceRef }) => {
  const selectedZone = useBuilderStore((state) => state.selectedZone);
  const setSelectedZone = useBuilderStore((state) => state.setSelectedZone);
  const setHoveredZone = useBuilderStore((state) => state.setHoveredZone);

  const isSelected = selectedZone === "header";
  const [guideY, setGuideY] = useState<number | null>(null);
  const { startResize } = useResizableHandle("header", surfaceRef, setGuideY);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <header
        ref={containerRef}
        className={`grid-header zone-clickable ${isSelected ? "zone-selected" : ""}`}
        onClick={() => setSelectedZone("header")}
        onMouseEnter={() => setHoveredZone("header")}
        onMouseLeave={() => setHoveredZone(null)}
      >
        <span style={{ fontSize: "1.2rem", color: "#333" }}>🔷 En-tête (Header)</span>

        {isSelected && (
          <div
            className="resize-border-bottom"
            onMouseDown={startResize}
            title="Redimensionner l'en-tête"
          />
        )}
      </header>

      {guideY !== null && <ResizeGuideLine y={guideY} />}
    </>
  );
};

export default HeaderZone;
