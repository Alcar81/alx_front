// src/components/pages/Builder/panels/floatingBuilderPanel/FloatingBuilderPanel.tsx

import React, { useState } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./Panels.css";
import { useDraggable } from "../../../../hooks/useDraggable";
import { useBuilderStore, ZoneKey } from "../../../../store/builderStore";
import { useLayoutStore, MIN_HEIGHTS, MAX_HEIGHTS, LayoutZoneKey } from "../../../../store/layoutStore";
import { useTemplateStore } from "../../../../store/templateStore";

interface FloatingBuilderPanelProps {
  surfaceRef: React.RefObject<HTMLDivElement>;
}

const zoneOptions: ZoneKey[] = ["header", "main", "footer"];

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const FloatingBuilderPanel: React.FC<FloatingBuilderPanelProps> = ({ surfaceRef }) => {
  const ref = useDraggable(surfaceRef);
  const [activeTab, setActiveTab] = useState<"general" | "zones">("zones");
  const [isDirty, setIsDirty] = useState(true);

  const {
    templates,
    selectedTemplate,
    setSelectedTemplate,
    addTemplate,
    removeTemplate,
    incrementVersion,
    updateTemplateLayout,
  } = useTemplateStore();

  const {
    selectedZone,
    setSelectedZone,
    zones,
    updateZone,
  } = useBuilderStore();

  const { layout, setHeight, toggleSection } = useLayoutStore();
  const zoneData = selectedZone ? zones[selectedZone] : null;

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ZoneKey;
    if (zoneOptions.includes(value)) {
      setSelectedZone(value);
    }
  };

  const handleReset = () => {
    if (!selectedZone) return;

    if (selectedZone === "header") {
      setHeight("header", "80px");
      updateZone("header", { height: 80 });
    } else if (selectedZone === "footer") {
      setHeight("footer", "60px");
      updateZone("footer", { height: 60 });
    }
    setIsDirty(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    if (!selectedZone || isNaN(numericValue)) return;

    if (name === "height" && (selectedZone === "header" || selectedZone === "footer")) {
      const clamped = clamp(numericValue, MIN_HEIGHTS[selectedZone], MAX_HEIGHTS[selectedZone]);
      setHeight(selectedZone, `${clamped}px`);
      updateZone(selectedZone, { height: clamped });
    } else {
      updateZone(selectedZone, { [name]: numericValue });
    }
    setIsDirty(true);
  };

  const handleCreateLayout = () => {
    const name = prompt("Nom du nouveau template ?");
    if (!name) return;
    addTemplate(name);
    setIsDirty(true);
  };

  const handleDeleteLayout = () => {
    if (!selectedTemplate) return;
    if (!window.confirm(`Supprimer le template "${selectedTemplate}" ?`)) return;
    removeTemplate(selectedTemplate);
    setIsDirty(true);
  };

  const handleIncrementVersion = () => {
    incrementVersion(selectedTemplate);
    setIsDirty(true);
  };

  const handleResetAll = () => {
    const zonesToReset: LayoutZoneKey[] = ["header", "main", "footer"];

    zonesToReset.forEach((zone) => {
      // Hauteur par défaut
      const defaultHeight = zone === "header" ? 80 : zone === "footer" ? 60 : 400;

      setHeight(zone, `${defaultHeight}px`);
      updateZone(zone as ZoneKey, { height: defaultHeight });

      // Forcer la visibilité uniquement si false
      if (!layout[zone]?.visible) {
        toggleSection(zone);
      }
    });

    setIsDirty(true);
  };


  const bounds = surfaceRef.current?.getBoundingClientRect();
  //const maxWidth = bounds?.width ?? window.innerWidth;
  //const maxHeight = bounds?.height ?? window.innerHeight;

  const clampedStyle = {
    left: "100px",
    top: "100px",
  };


  const showHeightInput = selectedZone === "header" || selectedZone === "footer";

  return (
    <div ref={ref} className="floating-panel" style={clampedStyle}>
      <div className="floating-header">📦 Panneau Builder</div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "general" ? "active" : ""}`}
          onClick={() => setActiveTab("general")}
        >
          Général {isDirty && activeTab === "general" && <span className="star">★</span>}
        </button>
        <button
          className={`tab ${activeTab === "zones" ? "active" : ""}`}
          onClick={() => setActiveTab("zones")}
        >
          Zones {isDirty && activeTab === "zones" && <span className="star">★</span>}
        </button>
      </div>

      <div className="panel-content">
        {activeTab === "general" && (
          <>
            <div className="row-input">
              <label htmlFor="layout-select">Nom :</label>
              <select
                id="layout-select"
                className="layout-dropdown"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
              >
                {templates.map((layout) => (
                  <option key={layout.name} value={layout.name}>
                    {layout.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="layout-action-buttons right">
              <IconButton
                className="icon-create"
                onClick={handleCreateLayout}
                aria-label="Créer un template"
              >
                <AddIcon />
              </IconButton>

              <IconButton
                className={`icon-delete ${selectedTemplate === "Portfolio-2024" ? "disabled" : ""}`}
                onClick={handleDeleteLayout}
                aria-label="Supprimer ce template"
                disabled={selectedTemplate === "Portfolio-2024"}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </div>

            <div className="row-input">
              <label>Créé le :</label>
              <span>{templates.find(t => t.name === selectedTemplate)?.createdAt || "-"}</span>
            </div>

            <div className="row-input">
              <label>Version :</label>
              <span>
                v.{templates.find(t => t.name === selectedTemplate)?.version || 1}
              </span>
              <button className="zone-reset-button" onClick={handleIncrementVersion}>📈 +1</button>
            </div>

            <div className="layout-actions">
              <button onClick={() => alert("📤 Export à venir")}>📤 Exporter</button>
              <button onClick={() => alert("📥 Import à venir")}>📥 Importer</button>
            </div>
          </>
        )}

        {activeTab === "zones" && (
          <>
            <div className="row-input">
              <label>Zone :</label>
              <select value={selectedZone || ""} onChange={handleZoneChange}>
                <option value="">-- sélectionnez --</option>
                {zoneOptions.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>

            {zoneData && (
              <>
                <div className="row-input">
                  <label>Largeur :</label>
                  <input
                    type="number"
                    name="width"
                    value={zoneData.width}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>

                {showHeightInput && (
                  <div className="row-input">
                    <label>Hauteur :</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <input
                        type="number"
                        name="height"
                        min={MIN_HEIGHTS[selectedZone]}
                        max={MAX_HEIGHTS[selectedZone]}
                        value={parseInt(layout[selectedZone].height, 10)}
                        onChange={handleInputChange}
                        style={{ width: "80px" }} // ✅ largeur confortable
                      />
                      <span style={{ fontSize: "0.9em", color: "#666" }}>px</span>
                    </div>
                  </div>
                )}

                {showHeightInput && (
                  <div className="row-input">
                    <label htmlFor="showZone">Afficher :</label>
                    <input
                      id="showZone"
                      type="checkbox"
                      checked={layout[selectedZone].visible}
                      onChange={() => {
                        toggleSection(selectedZone);
                        setIsDirty(true);
                      }}
                    />
                  </div>
                )}

                {showHeightInput && (
                  <div className="layout-actions">
                    <button className="zone-reset-button" onClick={handleReset}>🔁 Réinitialiser cette zone</button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className="bottom-actions">
        <div className="centered-reset">
          <button
            className="reset-layout-btn alt"
            onClick={handleResetAll}
          >
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
              updateTemplateLayout(selectedTemplate, layout); // ✅ Sauvegarde layout
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
