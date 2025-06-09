// 📁 Builder/blocks/BlockRenderer.tsx

import React from "react";
import type { PageBlock } from "../types/blockTypes";
import { usePageBuilderStore } from "../store/pageBuilderStore";

import VisualTextBlock from "./visualBlocks/VisualTextBlock";
import VisualImageBlock from "./visualBlocks/VisualImageBlock"; 
import DraggableBlock from "./DraggableBlock";

interface BlockRendererProps {
  block: PageBlock;
  surfaceRefZone?: React.RefObject<HTMLDivElement>; // rendu optionnel pour flexibilité future
}

// 📌 Valeurs par défaut pour le snapping
const defaultSnapTargets = [0, 100, 200, 300, 400];

const BlockRenderer: React.FC<BlockRendererProps> = ({ block, surfaceRefZone }) => {
  const removeBlock = usePageBuilderStore((state) => state.removeBlock);
  const updateBlockStyle = usePageBuilderStore((state) => state.updateBlockStyle);
  const selectedBlockId = usePageBuilderStore((state) => state.selectedBlockId);
  const setSelectedBlock = usePageBuilderStore((state) => state.setSelectedBlock);

  switch (block.type) {
    case "VisualTextBlock":
      return (
        <VisualTextBlock
          key={block.id}
          block={block}
          isSelected={selectedBlockId === block.id}
          onDelete={() => removeBlock(block.id)}
          onUpdateStyle={(id, style) => updateBlockStyle(id, style)}
          onSelect={() => setSelectedBlock(block.id)}
        />
      );

    case "VisualImageBlock":
      return (
        <VisualImageBlock
          key={block.id}
          block={block}
          isSelected={selectedBlockId === block.id}
          onDelete={() => removeBlock(block.id)}
          onSelect={() => setSelectedBlock(block.id)}
        />
      );

    case "DraggableBlock":
      if (!surfaceRefZone) {
        console.warn("❗ surfaceRefZone manquant pour DraggableBlock");
        return null;
      }
      return (
        <DraggableBlock
          key={block.id}
          surfaceRefZone={surfaceRefZone}
          snapTargetsX={defaultSnapTargets}
          snapTargetsY={defaultSnapTargets}
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

export default BlockRenderer;
