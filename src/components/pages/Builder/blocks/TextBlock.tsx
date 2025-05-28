// 📁 src/components/pages/Builder/blocks/TextBlock.tsx

import React from "react";
import { PageBlock } from "../store/pageBuilderStore";
import "./BuilderBlock.css"; // ✅ Pour le style général du bloc

interface TextBlockProps {
  block: PageBlock;
}

const TextBlock: React.FC<TextBlockProps> = ({ block }) => {
  return (
    <div
      className="block text-block"
      style={block.style || {}}
      onClick={(e) => {
        e.stopPropagation(); // ✅ Pour ne pas changer de zone quand on clique sur un bloc
      }}
    >
      <p style={{ fontWeight: "bold", color: "#333", fontSize: "1.1rem" }}>
        📝 {block.content || "Texte sans contenu"}
      </p>
    </div>
  );
};

export default TextBlock;
