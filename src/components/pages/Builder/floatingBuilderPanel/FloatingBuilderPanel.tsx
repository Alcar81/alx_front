// 📁 src/components/pages/Builder/floatingBuilderPanel/FloatingBuilderPanel.tsx

import React from "react";
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
  };

  const bounds = surfaceRef.current?.getBoundingClientRect();
  const maxWidth = bounds?.width ?? window.innerWidth;
  const maxHeight = bounds?.height ?? window.innerHeight;

  const clampedStyle = {
    left: `${clamp(panelPosition.x, 0, maxWidth - 260)}px`,
    top: `${clamp(panelPosition.y, 0, maxHeight - 180)}px`,
  };

  const showHeightInput = selectedZone === "header" || selectedZone === "footer";

  return (
    <div ref={ref} className="floating-panel" style={clampedStyle}>
      <div className="floating-header">📦 Panneau Builder</div>

      <div className="panel-content">
        <label>
          Zone :
          <select value={selectedZone || ""} onChange={handleZoneChange}>
            <option value="">-- sélectionnez --</option>
            {zoneOptions.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </label>

        {zoneData && (
          <div className="position-inputs">
            <label>
              Largeur:
              <input
                type="number"
                name="width"
                value={zoneData.width}
                onChange={handleInputChange}
                disabled
              />
            </label>

            {showHeightInput && (
              <label>
                Hauteur:
                <input
                  type="number"
                  name="height"
                  min={MIN_HEIGHTS[selectedZone]}
                  max={MAX_HEIGHTS[selectedZone]}
                  value={parseInt(layout[selectedZone].height)}
                  onChange={handleInputChange}
                />
              </label>
            )}

            {showHeightInput && (
              <label style={{ display: "block", marginTop: "0.5rem" }}>
                <input
                  type="checkbox"
                  checked={layout[selectedZone].visible}
                  onChange={() => toggleSection(selectedZone)}
                />
                {" "}Afficher la zone
              </label>
            )}
          </div>
        )}

        {showHeightInput && (
          <button onClick={handleReset}>🔁 Réinitialiser cette zone</button>
        )}
      </div>
    </div>
  );
};

export default FloatingBuilderPanel;
