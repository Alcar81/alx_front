// 📁 src/components/pages/Builder/zones/FooterZone.tsx

import React, { useRef, useState } from "react";
import "./Zones.css";
import { useBuilderStore } from "../../../../store/builderStore";
import { useResizableHandle } from "../../../../hooks/useResizableHandle";
import ResizeGuideLine from "../guides/ResizeGuideLine";

const FooterZone: React.FC<{ surfaceRef: React.RefObject<HTMLDivElement> }> = ({ surfaceRef }) => {
  const selectedZone = useBuilderStore((state) => state.selectedZone);
  const setSelectedZone = useBuilderStore((state) => state.setSelectedZone);
  const setHoveredZone = useBuilderStore((state) => state.setHoveredZone);

  const isSelected = selectedZone === "footer";
  const containerRef = useRef<HTMLDivElement>(null);

  const [guideY, setGuideY] = useState<number | null>(null);
  const { startResize } = useResizableHandle("footer", surfaceRef, setGuideY);

  return (
    <>
      <footer
        ref={containerRef}
        className={`grid-footer zone-clickable ${isSelected ? "zone-selected" : ""}`}
        onClick={() => setSelectedZone("footer")}
        onMouseEnter={() => setHoveredZone("footer")}
        onMouseLeave={() => setHoveredZone(null)}
      >
        <span style={{ fontSize: "1.2rem", color: "#fff" }}>🔻 Pied de page (Footer)</span>
        {isSelected && (
          <div
            className="resize-border-top"
            onMouseDown={startResize}
            title="Redimensionner le footer"
          />
        )}
      </footer>
      {guideY !== null && <ResizeGuideLine y={guideY} />}
    </>
  );
};

export default FooterZone;
