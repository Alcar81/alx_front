import React, { useState } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./FloatingBuilderPanel.css";
import { useDraggable } from "../../../../hooks/useDraggable";
import { useBuilderStore, ZoneKey } from "../../../../store/builderStore";
import {
  useLayoutStore,
  MIN_HEIGHTS,
  MAX_HEIGHTS,
} from "../../../../store/layoutStore";

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

  const [selectedLayout, setSelectedLayout] = useState("Portfolio-2024");
  const [layouts, setLayouts] = useState([
    { name: "Portfolio-2024", createdAt: "2024-11-10" },
    { name: "BlogPro", createdAt: "2025-01-18" },
    { name: "PromoSite", createdAt: "2025-05-01" },
  ]);

  const handleCreateLayout = () => {
    const name = prompt("Nom du nouveau layout ?");
    if (!name) return;
    const newLayout = { name, createdAt: new Date().toISOString().split("T")[0] };
    setLayouts([...layouts, newLayout]);
    setSelectedLayout(name);
    setIsDirty(true);
  };

  const handleDeleteLayout = () => {
    if (!selectedLayout) return;
    if (!window.confirm(`Supprimer le layout "${selectedLayout}" ?`)) return;
    setLayouts(layouts.filter((l) => l.name !== selectedLayout));
    setSelectedLayout(layouts[0]?.name || "");
    setIsDirty(true);
  };

  const {
    selectedZone,
    setSelectedZone,
    panelPosition,
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

  const bounds = surfaceRef.current?.getBoundingClientRect();
  const maxWidth = bounds?.width ?? window.innerWidth;
  const maxHeight = bounds?.height ?? window.innerHeight;

  const clampedStyle = {
    left: `${clamp(panelPosition.x, 0, maxWidth - 260)}px`,
    top: `${clamp(panelPosition.y, 0, maxHeight - 200)}px`,
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
                value={selectedLayout}
                onChange={(e) => setSelectedLayout(e.target.value)}
              >
                {layouts.map((layout) => (
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
                aria-label="Créer un layout"
              >
                <AddIcon />
              </IconButton>

              <IconButton
                className={`icon-delete ${selectedLayout === "Portfolio-2024" ? "disabled" : ""}`}
                onClick={handleDeleteLayout}
                aria-label="Supprimer ce layout"
                disabled={selectedLayout === "Portfolio-2024"}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </div>

            <div className="row-input">
              <label>Créé le :</label>
              <span>{layouts.find(l => l.name === selectedLayout)?.createdAt || "-"}</span>
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
                    <input
                      type="number"
                      name="height"
                      min={MIN_HEIGHTS[selectedZone]}
                      max={MAX_HEIGHTS[selectedZone]}
                      value={parseInt(layout[selectedZone].height)}
                      onChange={handleInputChange}
                    />
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
                    <button onClick={handleReset}>🔁 Réinitialiser cette zone</button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      <div className="bottom-actions">
        <div className="centered-save">
          <button
            className="save-button"
            onClick={() => {
              alert("✔️ Layout enregistré !");
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
