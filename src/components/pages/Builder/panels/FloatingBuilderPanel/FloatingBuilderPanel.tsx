// 📁 Builder/panels/floatingBuilderPanel/FloatingBuilderPanel.tsx

import React, { useEffect, useState } from "react";
import "../Panels.css";

import { useDraggable } from "../../hooks/useDraggable";
import { useBuilderStore } from "../../store/builderStore";
import { usePageBuilderStore } from "../../store/pageBuilderStore";
import { useTemplateStore } from "../../store/templateStore";
import { useLayoutStore } from "../../store/layoutStore";

// Tabs
import TabGeneral from "./TabGeneral";
import TabZones from "./TabZones";
import TabTreeView from "./TabTreeView";

interface FloatingBuilderPanelProps {
  surfaceRef: React.RefObject<HTMLDivElement>;
}

const FloatingBuilderPanel: React.FC<FloatingBuilderPanelProps> = ({ surfaceRef }) => {
  const ref = useDraggable(surfaceRef);
  const [activeTab, setActiveTab] = useState<"general" | "zones" | "tree">("zones");
  const [isDirty, setIsDirty] = useState(true);

  const selectedBlockId = usePageBuilderStore((s) => s.selectedBlockId);
  const blocks = usePageBuilderStore((s) => s.blocks);
  const selectedZone = useBuilderStore((s) => s.selectedZone);
  const setSelectedZone = useBuilderStore((s) => s.setSelectedZone);
  const layout = useLayoutStore((s) => s.layout);

  const { updateTemplateLayout, selectedTemplate } = useTemplateStore();

  // 🔄 Synchronisation automatique du bloc sélectionné
  useEffect(() => {
    if (!selectedBlockId) return;
    const block = blocks.find((b) => b.id === selectedBlockId);
    if (block && block.zone !== selectedZone) {
      setSelectedZone(block.zone);
    }
  }, [selectedBlockId, blocks, selectedZone, setSelectedZone]);

  const clampedStyle = {
    left: "100px",
    top: "100px",
  };

  return (
    <div ref={ref} className="floating-panel" style={clampedStyle}>
      <div className="floating-header">📦 Panneau Builder</div>

      <div className="tabs">
        <button className={`tab ${activeTab === "general" ? "active" : ""}`} onClick={() => setActiveTab("general")}>
          Général {isDirty && activeTab === "general" && <span className="star">★</span>}
        </button>
        <button className={`tab ${activeTab === "tree" ? "active" : ""}`} onClick={() => setActiveTab("tree")}>
          Arborescence {isDirty && activeTab === "tree" && <span className="star">★</span>}
        </button>
        <button className={`tab ${activeTab === "zones" ? "active" : ""}`} onClick={() => setActiveTab("zones")}>
          Zones {isDirty && activeTab === "zones" && <span className="star">★</span>}
        </button>
      </div>

      <div className="panel-content">
        {activeTab === "general" && <TabGeneral setIsDirty={setIsDirty} />}
        {activeTab === "zones" && <TabZones setIsDirty={setIsDirty} />}
        {activeTab === "tree" && <TabTreeView />}
      </div>

      <div className="bottom-actions">
        <div className="centered-reset">
          <button className="reset-layout-btn alt" onClick={() => window.location.reload()}>
            🔄 Réinitialiser
          </button>
        </div>
      </div>

      <hr className="panel-separator" />

      <div className="bottom-actions">
        <div className="centered-save">
          <button
            className="save-button"
            onClick={() => {
              updateTemplateLayout(selectedTemplate, layout);
              alert("✔️ Template enregistré !");
              setIsDirty(false);
            }}
          >
            💾 Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingBuilderPanel;
