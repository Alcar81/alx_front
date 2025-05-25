// 📁 src/components/pages/Builder/panels/floatingPagePanel/FloatingPagePanel.tsx

// 📁 src/components/pages/Builder/panels/floatingPagePanel/FloatingPagePanel.tsx

import React, { useState } from "react";
import { useDraggable } from "../../../../hooks/useDraggable";
import { usePageBuilderStore } from "../../../../store/pageBuilderStore";
import { useBuilderStore } from "../../../../store/builderStore";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ImageIcon from "@mui/icons-material/Image";
import "./Panels.css";

interface FloatingPagePanelProps {
  surfaceRef: React.RefObject<HTMLDivElement>;
}

const FloatingPagePanel: React.FC<FloatingPagePanelProps> = ({ surfaceRef }) => {
  const ref = useDraggable(surfaceRef);
  const { addBlock } = usePageBuilderStore();
  const { selectedZone } = useBuilderStore();

  const [activeTab, setActiveTab] = useState<"elements" | "features">("elements");
  const [selectedCategory, setSelectedCategory] = useState<"text" | "image">("text");

  const bounds = surfaceRef.current?.getBoundingClientRect();
  const maxWidth = bounds?.width ?? window.innerWidth;

  const clampedStyle = {
    left: `${Math.max(maxWidth - 360, 100)}px`,
    top: `100px`,
  };

  const handleAdd = (type: string) => {
    if (!selectedZone) return;
    addBlock(selectedZone, type as any);
  };

  return (
    <div ref={ref} className="floating-panel page-panel" style={clampedStyle}>
      <div className="floating-header">📦 Panneau Outils</div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "elements" ? "active" : ""}`}
          onClick={() => setActiveTab("elements")}
        >
          Éléments
        </button>
        <button
          className={`tab ${activeTab === "features" ? "active" : ""}`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
      </div>

      <div className="panel-content">
        {activeTab === "elements" && (
          <div className="block-toolbar-group">
            <div className="block-toolbar">
              <button
                className={selectedCategory === "text" ? "active" : ""}
                onClick={() => setSelectedCategory("text")}
                title="Blocs texte"
              >
                <TextFieldsIcon style={{ color: "blue" }} />
              </button>
              <button
                className={selectedCategory === "image" ? "active" : ""}
                onClick={() => setSelectedCategory("image")}
                title="Blocs image"
              >
                <ImageIcon style={{ color: "blue" }} />
              </button>
            </div>

            <hr className="panel-separator" />

            <div className="block-subgroup">
              {selectedCategory === "text" && (
                <>
                  <button onClick={() => handleAdd("TextBlock")}>H1</button>
                  <button onClick={() => handleAdd("TextBlock")}>H2</button>
                  <button onClick={() => handleAdd("TextBlock")}>H3</button>
                </>
              )}

              {selectedCategory === "image" && (
                <>
                  <button onClick={() => handleAdd("ImageBlock")}>Img</button>
                  <button onClick={() => handleAdd("ImageBlock")}>Vid</button>
                  <button onClick={() => handleAdd("ImageBlock")}>Logo</button>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <div className="placeholder">
            <p>🛠️ À venir : fonctionnalités avancées</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingPagePanel;
