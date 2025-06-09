// 📁 Builder/blocks/visualBlocks/BaseVisualBlock.tsx
import React from "react";
import InteractiveBlockWrapper from "../InteractiveBlockWrapper/InteractiveBlockWrapper";
import type { PageBlock } from "../../types/blockTypes";

interface BaseVisualBlockProps {
  block: PageBlock;
  isSelected: boolean;
  onDelete: () => void;
  onSelect: () => void;
  children: React.ReactNode;
}

const BaseVisualBlock: React.FC<BaseVisualBlockProps> = ({
  block,
  isSelected,
  onDelete,
  onSelect,
  children,
}) => {
  return (
    <InteractiveBlockWrapper
      id={block.id}
      style={block.style || {}}
      isSelected={isSelected}
      onDelete={onDelete}
      onSelect={onSelect}
    >
      {children}
    </InteractiveBlockWrapper>
  );
};

export default BaseVisualBlock;
