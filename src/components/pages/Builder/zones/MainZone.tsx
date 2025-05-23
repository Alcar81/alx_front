// 📁 src/components/pages/Builder/zones/MainZone.tsx

import React from "react";
import "./Zones.css";
import { useBuilderStore } from "../../../../store/builderStore";
import { usePageBuilderStore } from "../../../../store/pageBuilderStore";
import TextBlock from "../blocks/TextBlock";
import ImageBlock from "../blocks/ImageBlock";
import DraggableBlock from "../blocks/DraggableBlock"; // ✅ Ajout

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
      case "ImageBlock":
        return <ImageBlock key={block.id} />;
      case "DraggableBlock": // ✅ Gestion du bloc draggable
        return (
          <DraggableBlock
            key={block.id}
            surfaceRef={surfaceRef}
            snapTargetsX={[0, 100, 200, 300, 400, 500]}
            snapTargetsY={[0, 100, 200, 300, 400, 500]}
            tolerance={10}
          />
        );
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
      <p style={{ fontSize: "1.2rem", color: "#555" }}>📄 Zone principale (Main content)</p>
      {blocks.map(renderBlock)}
    </main>
  );
};

export default MainZone;
