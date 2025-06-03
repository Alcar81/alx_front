// 📁 Builder/layouts/zones/FooterZone.tsx

import React, { useState } from "react";
import "./Zones.css";
import { useBuilderStore } from "../../store/builderStore";
import { usePageBuilderStore, PageBlock } from "../../store/pageBuilderStore";
import { useResizableHandle } from "../../hooks/useResizableHandle";
import ResizeGuideLine from "../../guides/ResizeGuideLine";
import TextBlock from "../../blocks/TextBlock";
import ImageBlock from "../../blocks/ImageBlock";
import DraggableBlock from "../../blocks/DraggableBlock";

const FooterZone: React.FC<{ surfaceRefZone: React.RefObject<HTMLDivElement> }> = ({ surfaceRefZone }) => {
  const selectedZone = useBuilderStore((state) => state.selectedZone);
  const setSelectedZone = useBuilderStore.getState().setSelectedZone;
  const setHoveredZone = useBuilderStore.getState().setHoveredZone;

  const blocksRaw = usePageBuilderStore((state) => state.blocks);
  const addBlock = usePageBuilderStore.getState().addBlock;

  const blocks = blocksRaw
    .filter((b) => b.zone === "footer")
    .sort((a, b) => a.order - b.order);

  const isSelected = selectedZone === "footer";
  const [guideY, setGuideY] = useState<number | null>(null);
  const { startResize } = useResizableHandle("footer", surfaceRefZone, setGuideY);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("application/block-type");
    if (!type || blocks.length > 0) return;
    addBlock("footer", type as any);
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
      <footer
        ref={surfaceRefZone}
        className={`grid-footer zone-clickable ${isSelected ? "zone-selected" : ""}`}
        onClick={() => setSelectedZone("footer")}
        onMouseEnter={() => setHoveredZone("footer")}
        onMouseLeave={() => setHoveredZone(null)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <span className="zone-title">🔻 Pied de page (Footer)</span>
        {blocks.map(renderBlock)}
        {isSelected && (
          <div
            className="resize-border-top"
            onMouseDown={startResize}
            title="Redimensionner le pied de page"
          />
        )}
      </footer>
      {guideY !== null && <ResizeGuideLine y={guideY} />}
    </>
  );
};

export default FooterZone;
