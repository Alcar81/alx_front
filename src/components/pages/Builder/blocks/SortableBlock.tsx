// 📁 Builder/blocks/SortableBlock.tsx

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { usePageBuilderStore } from "../store/pageBuilderStore";
import type { PageBlock } from "../types/blockTypes";
import type { BlockStyle } from "../types/blockStyles";

// Blocs visuels
import VisualTextBlock from "./VisualTextBlock/VisualTextBlock";
import ImageBlock from "./ImageBlock";

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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "12px",
  };

  const renderBlock = () => {
    switch (block.type) {
      case "VisualTextBlock":
        return (
          <VisualTextBlock
            block={block}
            onDelete={removeBlock}
            onUpdateStyle={updateBlockStyle}
          />
        );
      case "ImageBlock":
        return <ImageBlock block={block} />;
      default:
        return <div>🧱 Bloc inconnu : {block.type}</div>;
    }
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {renderBlock()}
      <div style={{ textAlign: "right", marginTop: 4 }}>
        <button onClick={() => removeBlock(block.id)}>🗑️ Supprimer</button>
      </div>
    </div>
  );
};

export default SortableBlock;
