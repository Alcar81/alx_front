// 📁 Builder/panels/floatingPagePanel/FloatingPagePanel.tsx

import React, { useState } from "react";
import { useDraggable } from "../hooks/useDraggable";
import { usePageBuilderStore } from "../store/pageBuilderStore";
import { useBuilderStore } from "../store/builderStore";
import { blockTypes } from "../config/blockTypes";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ImageIcon from "@mui/icons-material/Image";
import "./Panels.css";

import { headerTemplates } from "../data/sectionTemplates/headerTemplates";
import { mainTemplates } from "../data/sectionTemplates/mainTemplates";
import { footerTemplates } from "../data/sectionTemplates/footerTemplates";

interface FloatingPagePanelProps {
  surfaceRef: React.RefObject<HTMLDivElement>;
}

const FloatingPagePanel: React.FC<FloatingPagePanelProps> = ({ surfaceRef }) => {
  const ref = useDraggable(surfaceRef);
  const { addBlock } = usePageBuilderStore();
  const { selectedZone } = useBuilderStore();

  const [activeTab, setActiveTab] = useState<"elements" | "templates">("elements");
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

  const filteredBlocks = blockTypes.filter((b) => b.type === selectedCategory);

  const [selectedTemplateZone, setSelectedTemplateZone] = useState<"header" | "main" | "footer">("header");

  const sectionTemplates =
    selectedTemplateZone === "header"
      ? headerTemplates
      : selectedTemplateZone === "main"
      ? mainTemplates
      : footerTemplates;


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
          className={`tab ${activeTab === "templates" ? "active" : ""}`}
          onClick={() => setActiveTab("templates")}
        >
          Modèles blocs
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
              {filteredBlocks.map((block) => (
                <button
                  key={block.id}
                  title={block.label}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("application/block-type", block.id);
                    e.dataTransfer.effectAllowed = "copy";
                  }}
                >
                  {block.icon}
                </button>
              ))}
            </div>

          </div>
        )}

        {activeTab === "templates" && (
          <div className="block-templates-group">
            <div className="template-zone-selector">
              <button onClick={() => setSelectedTemplateZone("header")} className={selectedTemplateZone === "header" ? "active" : ""}>
                🧱 Header
              </button>
              <button onClick={() => setSelectedTemplateZone("main")} className={selectedTemplateZone === "main" ? "active" : ""}>
                📄 Main
              </button>
              <button onClick={() => setSelectedTemplateZone("footer")} className={selectedTemplateZone === "footer" ? "active" : ""}>
                📥 Footer
              </button>
            </div>

            <hr className="panel-separator" />

            <div className="block-subgroup">
              {sectionTemplates.map((template) => (
                <button
                  key={template.id}
                  title={template.label}
                  onClick={() => console.log("Glisser modèle:", template)} // temporaire
                >
                  {/* On peut mettre une icône ou un simple label/ID ici */}
                  🧩
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingPagePanel;
