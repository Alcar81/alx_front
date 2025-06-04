// Builder/blocks/VisualTextBlock.tsx

import React from "react";
import BlockWrapper from "../BlockWrapper/BlockWrapper";
import VisualTextContent from "./VisualTextContent";
import { PageBlock } from "../../types/blockTypes";
import { BlockStyle } from "../../types/blockStyles";
import { defaultBlockStyle } from "../../constants/blockDefaults";
import "./VisualTextBlock.css";

interface VisualTextBlockProps {
  block: PageBlock;
  onDelete: (id: string) => void;
  onUpdateStyle: (id: string, newStyle: Partial<BlockStyle>) => void;
}

const VisualTextBlock: React.FC<VisualTextBlockProps> = ({
  block,
  onDelete,
  onUpdateStyle,
}) => {
  const mergedStyle = {
    ...defaultBlockStyle,
    ...block.style,
  } as BlockStyle;

  return (
    <BlockWrapper
      id={block.id}
      style={mergedStyle}
      onDelete={onDelete}
      onUpdateStyle={onUpdateStyle}
    >
      <VisualTextContent content={block.content} />
    </BlockWrapper>
  );
};

export default VisualTextBlock;