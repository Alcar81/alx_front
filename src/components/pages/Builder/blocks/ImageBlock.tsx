import React from "react";
import { PageBlock } from "../../../../store/pageBuilderStore";
import "./BuilderBlock.css";

interface ImageBlockProps {
  block: PageBlock;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ block }) => {
  return (
    <div
      className="block image-block"
      style={block.style || {}}
      onClick={(e) => {
        e.stopPropagation(); // Évite la propagation pour la sélection de zone
      }}
    >
      <img
        src={block.src || "https://via.placeholder.com/400x200"}
        alt="Contenu visuel"
        style={{ width: "100%", height: "auto", borderRadius: "6px" }}
      />
    </div>
  );
};

export default ImageBlock;
