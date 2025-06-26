// 📁 Builder/panels/FloatingPagePanel.tsx

import React, { useState, useEffect, useRef } from "react"; // ✅ Ajout useRef
import { useDraggable } from "../hooks/useDraggable";
import { useBuilderPanelsStore } from "../store/builderPanelsStore";
import { blockConfig } from "../config/blockConfig";
import type { BlockType } from "../types/blockTypes";
import type { SectionTemplate } from "../types/sectionTemplate";

import TextFieldsIcon from "@mui/icons-material/TextFields";
import ImageIcon from "@mui/icons-material/Image";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import "./Panels.css";

import { validateTemplates } from "../utils/validateTemplates";
import { headerTemplates } from "../data/sectionTemplates/headerTemplates";
import { mainTemplates } from "../data/sectionTemplates/mainTemplates";
import { footerTemplates } from "../data/sectionTemplates/footerTemplates";

interface FloatingPagePanelProps {
  surfaceRef: React.RefObject<HTMLDivElement>;
}

const FloatingPagePanel: React.FC<FloatingPagePanelProps> = ({ surfaceRef }) => {
  const ref = useDraggable(surfaceRef);

  const {
    hoveredZoneKey,
    setGhostBlock,
    updateGhostPosition,
    dropGhostBlock,
  } = useBuilderPanelsStore();

  const lastZoneRef = useRef(hoveredZoneKey); // ✅ Ref pour mémoriser la dernière zone valide

  useEffect(() => {
    lastZoneRef.current = hoveredZoneKey;
  }, [hoveredZoneKey]);

  console.log("🧪 hoveredZoneKey =", hoveredZoneKey);

  const [activeTab, setActiveTab] = useState<"elements" | "templates">("elements");
  const [selectedCategory, setSelectedCategory] = useState<"text" | "image" | "group">("text");
  const [selectedTemplateZone, setSelectedTemplateZone] = useState<"header" | "main" | "footer">("header");

  const bounds = surfaceRef.current?.getBoundingClientRect();
  const maxWidth = bounds?.width ?? window.innerWidth;

  const clampedStyle = {
    left: `${Math.max(maxWidth - 360, 100)}px`,
    top: `100px`,
  };

  const filteredBlocks = blockConfig.filter((b) => b.type === selectedCategory);

  const castedTemplate = (tpl: any): SectionTemplate => ({
    ...tpl,
    blocks: tpl.blocks.map((b: any) => ({
      id: b.id,
      component: b.component as BlockType,
    })),
  });

  const sectionTemplates: SectionTemplate[] =
    selectedTemplateZone === "header"
      ? headerTemplates.map(castedTemplate)
      : selectedTemplateZone === "main"
      ? mainTemplates.map(castedTemplate)
      : footerTemplates.map(castedTemplate);

  useEffect(() => {
    validateTemplates(headerTemplates, "Header");
    validateTemplates(mainTemplates, "Main");
    validateTemplates(footerTemplates, "Footer");
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateGhostPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      dropGhostBlock();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [updateGhostPosition, dropGhostBlock]);

  const handleGhostStart = (blockId: string) => {
    const block = blockConfig.find((b) => b.id === blockId);
    if (!block) return;

    const width = block.defaultWidth || 120;
    const height = block.defaultHeight || 50;

    // 📍 Obtiens la position du curseur
    const initialX = window.event instanceof MouseEvent ? window.event.clientX : 0;
    const initialY = window.event instanceof MouseEvent ? window.event.clientY : 0;

    setGhostBlock({
      type: block.id as BlockType,
      zone: "main", // provisoire
      position: {
        x: initialX - width / 2,
        y: initialY - height / 2,
      },
      size: { width, height },
      status: "default",
      label: block.label,
    });
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
              >
                <TextFieldsIcon style={{ color: "blue" }} />
              </button>
              <button
                className={selectedCategory === "image" ? "active" : ""}
                onClick={() => setSelectedCategory("image")}
              >
                <ImageIcon style={{ color: "blue" }} />
              </button>
              <button
                className={selectedCategory === "group" ? "active" : ""}
                onClick={() => setSelectedCategory("group")}
              >
                <ViewModuleIcon style={{ color: "blue" }} />
              </button>
            </div>

            <hr className="panel-separator" />

            <div className="block-subgroup">
              {filteredBlocks.map((block) => (
                <button key={block.id} title={block.label} onClick={() => handleGhostStart(block.id)}>
                  {block.icon}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "templates" && (
          <div className="block-templates-group">
            <div className="template-zone-selector">
              <button
                onClick={() => setSelectedTemplateZone("header")}
                className={selectedTemplateZone === "header" ? "active" : ""}
              >
                🧱 Header
              </button>
              <button
                onClick={() => setSelectedTemplateZone("main")}
                className={selectedTemplateZone === "main" ? "active" : ""}
              >
                📄 Main
              </button>
              <button
                onClick={() => setSelectedTemplateZone("footer")}
                className={selectedTemplateZone === "footer" ? "active" : ""}
              >
                📥 Footer
              </button>
            </div>

            <hr className="panel-separator" />

            <div className="block-subgroup">
              {sectionTemplates.map((template) => (
                <button
                  key={template.id}
                  title={template.label}
                  onClick={() => console.log("🧩 Glisser modèle:", template)}
                >
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
