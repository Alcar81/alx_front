// 📁 Builder/panels/floatingBuilderPanel/TabZones.tsx

import React from "react";
import { useLayoutStore, MIN_HEIGHTS, MAX_HEIGHTS } from "../../store/layoutStore";
import { useBuilderStore } from "../../store/builderStore";
import { usePageBuilderStore } from "../../store/pageBuilderStore";
import type { ZoneKey } from "../../types/zoneTypes";

interface Props {
  setIsDirty: (v: boolean) => void;
}

const zoneOptions: ZoneKey[] = ["header", "main", "footer"];

const TabZones: React.FC<Props> = ({ setIsDirty }) => {
  const hoveredZoneKey = usePageBuilderStore((s) => s.hoveredZoneKey);
  const { selectedZone, setSelectedZone, zones, updateZone } = useBuilderStore();
  const { layout, setHeight, toggleSection } = useLayoutStore();

  const zoneData = selectedZone ? zones[selectedZone] : null;
  const showHeightInput = selectedZone === "header" || selectedZone === "footer";

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ZoneKey;
    if (zoneOptions.includes(value)) {
      setSelectedZone(value);
    }
  };

  const handleReset = () => {
    if (!selectedZone) return;
    const height = selectedZone === "header" ? 80 : 60;
    setHeight(selectedZone, `${height}px`);
    updateZone(selectedZone, { height });
    setIsDirty(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    if (!selectedZone || isNaN(numericValue)) return;

    if (name === "height" && (selectedZone === "header" || selectedZone === "footer")) {
      const clamped = Math.min(Math.max(numericValue, MIN_HEIGHTS[selectedZone]), MAX_HEIGHTS[selectedZone]);
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
              {zone}
            </option>
          ))}
        </select>
      </div>

      {zoneData && (
        <>
          <div className="row-input">
            <label>Largeur :</label>
            <input type="number" name="width" value={zoneData.width} onChange={handleInputChange} disabled />
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
                  style={{ width: "80px" }}
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
              <button className="zone-reset-button" onClick={handleReset}>
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