// 📁 Builder/blocks/SortableBlock.tsx

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { usePageBuilderStore } from "../store/pageBuilderStore";
import type { PageBlock } from "../types/blockTypes";

// Blocs visuels refactorisés
import VisualTextBlock from "./visualBlocks/VisualTextBlock";
import VisualImageBlock from "./visualBlocks/VisualImageBlock"; // ✅ renommé pour cohérence

interface SortableBlockProps {
  block: PageBlock;
  index: number;
}

const SortableBlock: React.FC<SortableBlockProps> = ({ block }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: block.id,
  });

  const removeBlock = usePageBuilderStore((state) => state.removeBlock);
  const updateBlockStyle = usePageBuilderStore((state) => state.updateBlockStyle);
  const selectedBlockId = usePageBuilderStore((state) => state.selectedBlockId);
  const setSelectedBlock = usePageBuilderStore((state) => state.setSelectedBlock);

  const isSelected = selectedBlockId === block.id;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "12px",
  };

  const renderBlock = () => {
    const commonProps = {
      block,
      isSelected,
      onDelete: () => removeBlock(block.id),
      onSelect: () => setSelectedBlock(block.id),
      onUpdateStyle: (newStyle: any) => updateBlockStyle(block.id, newStyle),
    };

    switch (block.type) {
      case "VisualTextBlock":
        return <VisualTextBlock {...commonProps} />;
      case "VisualImageBlock":
        return <VisualImageBlock {...commonProps} />;
      default:
        return <div>❓ Bloc inconnu : {block.type}</div>;
    }
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {renderBlock()}
    </div>
  );
};

export default SortableBlock;
