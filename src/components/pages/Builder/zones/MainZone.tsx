// 📁 src/components/pages/Builder/zones/MainZone.tsx

import React from "react";
import "./Zones.css";
import { useBuilderStore } from "../../../../store/builderStore";
import { usePageBuilderStore } from "../../../../store/pageBuilderStore";
import TextBlock from "../blocks/TextBlock";

const MainZone: React.FC<{ surfaceRef: React.RefObject<HTMLDivElement> }> = ({ surfaceRef }) => {
  const selectedZone = useBuilderStore((state) => state.selectedZone);
  const setSelectedZone = useBuilderStore((state) => state.setSelectedZone);
  const setHoveredZone = useBuilderStore((state) => state.setHoveredZone);
  const blocks = usePageBuilderStore((state) => state.blocks);

  const isSelected = selectedZone === "main";

  const renderBlock = (block: { id: string; type: string }) => {
    switch (block.type) {
      case "TextBlock":
        return <TextBlock key={block.id} />;
      // 🧱 Ajoute ici d'autres types plus tard (ImageBlock, etc.)
      default:
        return (
          <div key={block.id} className="block unknown-block">
            ❓ Bloc inconnu : {block.type}
          </div>
        );
    }
  };

  return (
    <main
      className={`grid-main zone-clickable ${isSelected ? "zone-selected" : ""}`}
      onClick={() => setSelectedZone("main")}
      onMouseEnter={() => setHoveredZone("main")}
      onMouseLeave={() => setHoveredZone(null)}
    >
      <p>📄 Zone principale (Main content)</p>
      {blocks.map(renderBlock)}
    </main>
  );
};

export default MainZone;
