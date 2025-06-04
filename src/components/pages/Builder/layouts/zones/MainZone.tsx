// 📁 Builder/layouts/zones/MainZone.tsx

import React from "react";
import "./Zones.css";

import { useBuilderStore } from "../../store/builderStore";
import { usePageBuilderStore } from "../../store/pageBuilderStore";

import VisualTextBlock from "../../blocks/VisualTextBlock/VisualTextBlock";
import ImageBlock from "../../blocks/ImageBlock";
import DraggableBlock from "../../blocks/DraggableBlock";

import type { PageBlock } from "../../types/blockTypes";

const MainZone: React.FC<{
  surfaceRefZone: React.RefObject<HTMLDivElement>;
}> = ({ surfaceRefZone }) => {
  const selectedZone = useBuilderStore((state) => state.selectedZone);
  const setSelectedZone = useBuilderStore.getState().setSelectedZone;
  const setHoveredZone = useBuilderStore.getState().setHoveredZone;

  const blocksRaw = usePageBuilderStore((state) => state.blocks);
  const addBlock = usePageBuilderStore.getState().addBlock;
  const removeBlock = usePageBuilderStore.getState().removeBlock;
  const updateBlockStyle = usePageBuilderStore.getState().updateBlockStyle;

  const blocks = blocksRaw
    .filter((b) => b.zone === "main")
    .sort((a, b) => a.order - b.order);

  const isSelected = selectedZone === "main";

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("application/block-type");
    if (!type || blocks.length > 0) return;
    addBlock("main", type as any);
  };

  const renderBlock = (block: PageBlock) => {
    switch (block.type) {
      case "VisualTextBlock":
        return (
          <VisualTextBlock
            key={block.id}
            block={block}
            onDelete={removeBlock}
            onUpdateStyle={updateBlockStyle}
          />
        );
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
        return (
          <div key={block.id} className="block unknown-block">
            ❓ {block.type}
          </div>
        );
    }
  };

  return (
    <main
      ref={surfaceRefZone}
      className={`grid-main zone-clickable ${isSelected ? "zone-selected" : ""}`}
      onClick={() => setSelectedZone("main")}
      onMouseEnter={() => setHoveredZone("main")}
      onMouseLeave={() => setHoveredZone(null)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <p className="zone-title">📄 Zone principale (Main content)</p>
      {blocks.map(renderBlock)}
    </main>
  );
};

export default MainZone;
