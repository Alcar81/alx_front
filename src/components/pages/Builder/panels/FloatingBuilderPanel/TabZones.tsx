// 📁 Builder/panels/floatingBuilderPanel/TabZones.tsx

import React from "react";
import { useLayoutStore } from "../../store/layoutStore";
import { useBuilderPanelsStore } from "../../store/builderPanelsStore";
import { MIN_HEIGHTS, MAX_HEIGHTS, DEFAULT_HEIGHTS } from "../../constants/defaultHeights";
import type { LayoutZoneKey, FooterMode } from "../../types/zoneTypes";

interface Props {
  setIsDirty: (v: boolean) => void;
}

const zoneOptions: LayoutZoneKey[] = ["header", "main", "footer"];

const TabZones: React.FC<Props> = ({ setIsDirty }) => {
  const hoveredZoneKey = useBuilderPanelsStore((s) => s.hoveredZoneKey);
  const {
    selectedZone,
    setSelectedZone,
    zones,
    updateZone,
    zoneRealHeights,
    zoneHeightDiffs,
  } = useBuilderPanelsStore();

  const { layout, setHeight, toggleSection, setLayout } = useLayoutStore();

  const zoneData = selectedZone ? zones[selectedZone] : null;
  const isAutoHeight = selectedZone && layout[selectedZone]?.height === "auto";
  const isFooterDisabled = layout.footerMode === "none";

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as LayoutZoneKey;
    if (zoneOptions.includes(value)) {
      setSelectedZone(value);
    }
  };

  const handleReset = () => {
    if (!selectedZone || selectedZone === "main") return;
    const height = selectedZone === "header" ? 80 : 60;
    setHeight(selectedZone, `${height}px`);
    updateZone(selectedZone, { height });
    setIsDirty(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    if (!selectedZone || isNaN(numericValue)) return;

    if (name === "height") {
      const clamped = Math.min(
        Math.max(numericValue, MIN_HEIGHTS[selectedZone]),
        MAX_HEIGHTS[selectedZone]
      );
      setHeight(selectedZone, `${clamped}px`);
      updateZone(selectedZone, { height: clamped });
    } else {
      updateZone(selectedZone, { [name]: numericValue });
    }
    setIsDirty(true);
  };

  return (
    <>
      <div className="row-input">
        <label>Zone :</label>
        <select value={selectedZone || ""} onChange={handleZoneChange}>
          <option value="">-- sélectionnez --</option>
          {zoneOptions.map((zone) => (
            <option
              key={zone}
              value={zone}
              style={{
                backgroundColor: hoveredZoneKey === zone ? "#d0f5d0" : undefined,
                fontWeight: hoveredZoneKey === zone ? "bold" : undefined,
              }}
            >
              {zone === "footer" && layout.footerMode === "none"
                ? "footer (désactivé)"
                : zone}
            </option>
          ))}
        </select>
      </div>

      {zoneData && selectedZone && (
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

          <div className="row-input">
            <label>Hauteur (config) :</label>
            {isAutoHeight ? (
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <span style={{ fontStyle: "italic", color: "#666" }}>auto</span>
                <button
                  onClick={() => {
                    const defaultHeight = DEFAULT_HEIGHTS[selectedZone];
                    setHeight(selectedZone, `${defaultHeight}px`);
                    updateZone(selectedZone, { height: defaultHeight });
                    setIsDirty(true);
                  }}
                  title="Désactiver auto"
                  disabled={selectedZone === "footer" && isFooterDisabled}
                >
                  ⛔️ Désactiver auto
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <input
                  type="number"
                  name="height"
                  min={MIN_HEIGHTS[selectedZone]}
                  max={MAX_HEIGHTS[selectedZone]}
                  value={parseInt(layout[selectedZone]?.height ?? "0", 10)}
                  onChange={handleInputChange}
                  style={{ width: "80px" }}
                  disabled={selectedZone === "footer" && isFooterDisabled}
                />
                <span style={{ fontSize: "0.9em", color: "#666" }}>px</span>
                {selectedZone === "main" && (
                  <button
                    onClick={() => {
                      setHeight(selectedZone, "auto");
                      updateZone(selectedZone, { height: "auto" });
                      setIsDirty(true);
                    }}
                    title="Activer hauteur auto"
                  >
                    ⚙️ Utiliser auto
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="row-input">
            <label>Hauteur réelle :</label>
            <div style={{ fontSize: "0.9em", color: "#333" }}>
              {zoneRealHeights[selectedZone]} px
            </div>
          </div>

          <div className="row-input">
            <label>Écart détecté :</label>
            <div style={{ fontSize: "0.9em", color: "#333" }}>
              {zoneHeightDiffs[selectedZone] > 0 ? "+" : ""}
              {zoneHeightDiffs[selectedZone]} px
            </div>
          </div>

          <div className="row-input">
            <label htmlFor="showZone">Afficher :</label>
            <input
              id="showZone"
              type="checkbox"
              checked={layout[selectedZone]?.visible ?? true}
              onChange={() => {
                toggleSection(selectedZone);
                setIsDirty(true);
              }}
              disabled={selectedZone === "main" || (selectedZone === "footer" && isFooterDisabled)}
            />
          </div>

          {selectedZone === "footer" && (
            <div className="row-input">
              <label>Mode de footer :</label>
              <select
                value={layout.footerMode}
                onChange={(e) => {
                  const mode = e.target.value as FooterMode;
                  setLayout({
                    ...layout,
                    footerMode: mode,
                  });
                  setIsDirty(true);
                }}
              >
                <option value="fixed">📌 Fixe (en dehors de main)</option>
                <option value="inline">🧩 Intégré (dans main)</option>
                <option value="none">🚫 Aucun (désactivé)</option>
              </select>
            </div>
          )}

          {selectedZone !== "main" && (
            <div className="layout-actions">
              <button
                className="zone-reset-button"
                onClick={handleReset}
                disabled={selectedZone === "footer" && isFooterDisabled}
              >
                🔁 Réinitialiser cette zone
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TabZones;
