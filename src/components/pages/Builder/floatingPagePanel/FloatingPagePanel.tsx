import React from "react";
import { useDraggable } from "../../../../hooks/useDraggable";
import { usePageBuilderStore } from "../../../../store/pageBuilderStore";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ImageIcon from "@mui/icons-material/Image";
import "./FloatingPagePanel.css";

interface FloatingPagePanelProps {
  surfaceRef: React.RefObject<HTMLDivElement>;
}

const FloatingPagePanel: React.FC<FloatingPagePanelProps> = ({ surfaceRef }) => {
  const ref = useDraggable(surfaceRef);
  const { addBlock, blocks } = usePageBuilderStore();

  return (
    <div ref={ref} className="floating-panel page-panel">
      <div className="floating-header">📐 Page Builder</div>

      <div className="panel-content">
        <p><strong>Ajouter un bloc</strong></p>
        <div className="block-toolbar">
          <button onClick={() => addBlock("TextBlock")}><TextFieldsIcon style={{ color: "blue" }} /></button>
          <button onClick={() => addBlock("ImageBlock")}><ImageIcon style={{ color: "blue" }} /></button>
        </div>

        <hr />

        <div className="summary">
          <strong>Blocs actuels :</strong>
          <ul>
            {blocks.map((block, index) => (
              <li key={index}>{block.type}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FloatingPagePanel;
