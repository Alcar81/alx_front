// Builder/blocks/VisualTextContent.tsx

import React from "react";
import "./VisualTextBlock.css";

interface VisualTextContentProps {
  content?: string;
}

const VisualTextContent: React.FC<VisualTextContentProps> = ({ content }) => {
  return (
    <div className="content" contentEditable={false}>
      {content || "Texte..."}
    </div>
  );
};

export default VisualTextContent;