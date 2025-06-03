// 📁 Builder/layouts/zones/HeaderZone.tsx

import React, { useState } from "react";
import "./Zones.css";
import { useBuilderStore } from "../../store/builderStore";
import { usePageBuilderStore, PageBlock } from "../../store/pageBuilderStore";
import { useResizableHandle } from "../../hooks/useResizableHandle";
import ResizeGuideLine from "../../guides/ResizeGuideLine";
import TextBlock from "../../blocks/TextBlock";
import ImageBlock from "../../blocks/ImageBlock";
import DraggableBlock from "../../blocks/DraggableBlock";

const HeaderZone: React.FC<{ surfaceRefZone: React.RefObject<HTMLDivElement> }> = ({ surfaceRefZone }) => {
  const selectedZone = useBuilderStore((state) => state.selectedZone);
  const setSelectedZone = useBuilderStore.getState().setSelectedZone;
  const setHoveredZone = useBuilderStore.getState().setHoveredZone;

  const blocksRaw = usePageBuilderStore((state) => state.blocks);
  const addBlock = usePageBuilderStore.getState().addBlock;

  const blocks = blocksRaw
    .filter((b) => b.zone === "header")
    .sort((a, b) => a.order - b.order);

  const isSelected = selectedZone === "header";
  const [guideY, setGuideY] = useState<number | null>(null);
  const { startResize } = useResizableHandle("header", surfaceRefZone, setGuideY);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("application/block-type");
    if (!type || blocks.length > 0) return;
    addBlock("header", type as any);
  };

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
            snapTargetsX={[0, 100, 200, 300, 400]}
            snapTargetsY={[0, 100, 200, 300, 400]}
            tolerance={10}
          />
        );
      default:
        return <div key={block.id} className="block unknown-block">❓ {block.type}</div>;
    }
  };

  return (
    <>
      <header
        ref={surfaceRefZone}
        className={`grid-header zone-clickable ${isSelected ? "zone-selected" : ""}`}
        onClick={() => setSelectedZone("header")}
        onMouseEnter={() => setHoveredZone("header")}
        onMouseLeave={() => setHoveredZone(null)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <span className="zone-title">🔷 En-tête (Header)</span>
        {blocks.map(renderBlock)}
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
