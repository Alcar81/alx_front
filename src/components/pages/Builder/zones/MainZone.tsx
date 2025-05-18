// 📁 src/components/pages/Builder/zones/MainZone.tsx

import React from "react";
import "./Zones.css";
import { useBuilderStore } from "../../../../store/builderStore";

const MainZone: React.FC<{ surfaceRef: React.RefObject<HTMLDivElement> }> = ({ surfaceRef }) => {
  const selectedZone = useBuilderStore((state) => state.selectedZone);
  const setSelectedZone = useBuilderStore((state) => state.setSelectedZone);
  const setHoveredZone = useBuilderStore((state) => state.setHoveredZone);

  const isSelected = selectedZone === "main";

  return (
    <main
      className={`grid-main zone-clickable ${isSelected ? "zone-selected" : ""}`}
      onClick={() => setSelectedZone("main")}
      onMouseEnter={() => setHoveredZone("main")}
      onMouseLeave={() => setHoveredZone(null)}
    >
      <p>📄 Zone principale (Main content)</p>
    </main>
  );
};

export default MainZone;
