// 📁 Builder/blocks/visualBlocks/VisualTextBlock.tsx

import React from "react";
import BaseVisualBlock from "./BaseVisualBlock";
import VisualTextContent from "./VisualTextContent";
import { PageBlock } from "../../types/blockTypes";
import { BlockStyle } from "../../types/blockStyles";
import { defaultBlockStyle } from "../../constants/blockDefaults";

interface VisualTextBlockProps {
  block: PageBlock;
  isSelected: boolean;
  onDelete: (id: string) => void;
  onSelect: () => void;
  onUpdateStyle: (id: string, newStyle: Partial<BlockStyle>) => void;
}

const VisualTextBlock: React.FC<VisualTextBlockProps> = ({
  block,
  isSelected,
  onDelete,
  onSelect,
  onUpdateStyle,
}) => {
  const mergedStyle: BlockStyle = {
    ...defaultBlockStyle,
    ...block.style,
  };

  return (
    <BaseVisualBlock
      block={{ ...block, style: mergedStyle }}
      isSelected={isSelected}
      onDelete={() => onDelete(block.id)}
      onSelect={onSelect}
    >
      <VisualTextContent content={block.content} />
    </BaseVisualBlock>
  );
};

export default VisualTextBlock;
