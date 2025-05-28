// 📁 src/components/pages/Builder/zones/MainZone.tsx

import React from "react";
import "./Zones.css";
import { useBuilderStore } from "../../store/builderStore";
import { usePageBuilderStore, PageBlock } from "../../store/pageBuilderStore";
import TextBlock from "../../blocks/TextBlock";
import ImageBlock from "../../blocks/ImageBlock";
import DraggableBlock from "../../blocks/DraggableBlock";

const MainZone: React.FC<{ surfaceRefZone: React.RefObject<HTMLDivElement> }> = ({ surfaceRefZone }) => {
  const selectedZone = useBuilderStore((state) => state.selectedZone);
  const setSelectedZone = useBuilderStore.getState().setSelectedZone;
  const setHoveredZone = useBuilderStore.getState().setHoveredZone;

  const blocksRaw = usePageBuilderStore((state) => state.blocks);
  const blocks = blocksRaw
    .filter((b) => b.zone === "main")
    .sort((a, b) => a.order - b.order);

  const isSelected = selectedZone === "main";

  const renderBlock = (block: PageBlock) => {
    switch (block.type) {
      case "TextBlock":
        return <TextBlock key={block.id} block={block} />;
      case "ImageBlock":
        return <ImageBlock key={block.id} block={block} />;
      case "DraggableBlock":
        return (
          <DraggableBlock
            key={block.id}
            surfaceRefZone={surfaceRefZone}
            snapTargetsX={[0, 100, 200, 300, 400, 500]}
            snapTargetsY={[0, 100, 200, 300, 400, 500]}
            tolerance={10}
          />
        );
      default:
        return <div key={block.id} className="block unknown-block">❓ {block.type}</div>;
    }
  };

  return (
    <main
      ref={surfaceRefZone}
      className={`grid-main zone-clickable ${isSelected ? "zone-selected" : ""}`}
      onClick={() => setSelectedZone("main")}
      onMouseEnter={() => setHoveredZone("main")}
      onMouseLeave={() => setHoveredZone(null)}
    >
      <p className="zone-title">📄 Zone principale (Main content)</p>
      {blocks.map(renderBlock)}
    </main>
  );
};

export default MainZone;
