// 📁 Builder/blocks/visualBlocks/VisualImageBlock.tsx

import React from "react";
import type { PageBlock } from "../../types/blockTypes";
import BaseVisualBlock from "./BaseVisualBlock";

interface VisualImageBlockProps {
  block: PageBlock;
  isSelected: boolean;
  onDelete: () => void;
  onSelect: () => void;
}

const VisualImageBlock: React.FC<VisualImageBlockProps> = ({
  block,
  isSelected,
  onDelete,
  onSelect,
}) => {
  return (
    <BaseVisualBlock
      block={block}
      isSelected={isSelected}
      onDelete={onDelete}
      onSelect={onSelect}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#e0e0e0",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "14px",
          color: "#444",
        }}
      >
        {block.style?.width}×{block.style?.height}
      </div>
    </BaseVisualBlock>
  );
};

export default VisualImageBlock;
