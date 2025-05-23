// 📁 src/components/pages/Builder/panels/floatingPagePanel/FloatingPagePanel.tsx

import React from "react";
import { useDraggable } from "../../../../hooks/useDraggable";
import { usePageBuilderStore } from "../../../../store/pageBuilderStore";
import { useBuilderStore } from "../../../../store/builderStore";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ImageIcon from "@mui/icons-material/Image";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import "./Panels.css";

interface FloatingPagePanelProps {
  surfaceRef: React.RefObject<HTMLDivElement>;
}

const FloatingPagePanel: React.FC<FloatingPagePanelProps> = ({ surfaceRef }) => {
  const ref = useDraggable(surfaceRef);
  const { addBlock, blocks } = usePageBuilderStore();
  const { resetLayout } = useBuilderStore(); // ✅ reset layout intégré

  return (
    <div ref={ref} className="floating-panel page-panel">
      <div className="floating-header">📐 Page Builder</div>

      <div className="panel-content">
        <p><strong>Ajouter un bloc</strong></p>
        <div className="block-toolbar">
          <button onClick={() => addBlock("TextBlock")}>
            <TextFieldsIcon style={{ color: "blue" }} />
          </button>
          <button onClick={() => addBlock("ImageBlock")}>
            <ImageIcon style={{ color: "blue" }} />
          </button>
          <button onClick={() => addBlock("DraggableBlock")} title="Bloc draggable">
            <OpenWithIcon style={{ color: "blue" }} />
          </button>
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

        <div className="layout-actions">
          <button onClick={resetLayout} className="reset-layout-btn">
            🔄 Réinitialiser le layout
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingPagePanel;
