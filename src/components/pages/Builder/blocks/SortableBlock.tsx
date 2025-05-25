// 📁 src/components/pages/Builder/blocks/SortableBlock.tsx

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PageBlock, usePageBuilderStore } from "@/store/pageBuilderStore";

// Blocs visuels
import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock"; // 👈 Nouveau bloc image

interface SortableBlockProps {
  block: PageBlock;
  index: number;
}

const SortableBlock: React.FC<SortableBlockProps> = ({ block }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: block.id,
  });

  const removeBlock = usePageBuilderStore((state) => state.removeBlock);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "12px",
  };

  const renderBlock = () => {
    switch (block.type) {
      case "TextBlock":
        return <TextBlock block={block} />;
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
