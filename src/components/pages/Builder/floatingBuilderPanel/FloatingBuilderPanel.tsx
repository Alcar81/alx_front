// 📁 src/components/pages/Builder/floatingBuilderPanel/FloatingBuilderPanel.tsx

import React from "react";
import "./FloatingBuilderPanel.css";
import { useDraggable } from "../../../../hooks/useDraggable";
import { useBuilderStore, ZoneKey } from "../../../../store/builderStore";

interface FloatingBuilderPanelProps {
  surfaceRef: React.RefObject<HTMLDivElement>;
}

const zoneOptions: ZoneKey[] = [
  "header",
  "main",
  "footer",
];

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const FloatingBuilderPanel: React.FC<FloatingBuilderPanelProps> = ({ surfaceRef }) => {
  const ref = useDraggable(surfaceRef);

  const {
    selectedZone,
    setSelectedZone,
    panelPosition,
    zones,
    resetLayout,
    updateZone,
  } = useBuilderStore();

  const zoneData = selectedZone ? zones[selectedZone] : null;

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ZoneKey;
    if (zoneOptions.includes(value)) {
      setSelectedZone(value);
    }
  };

  const handleReset = () => {
    resetLayout(); // 🟢 Simplicité absolue
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    if (!selectedZone || isNaN(numericValue)) return;

    updateZone(selectedZone, { [name]: numericValue });
  };

  const bounds = surfaceRef.current?.getBoundingClientRect();
  const maxWidth = bounds?.width ?? window.innerWidth;
  const maxHeight = bounds?.height ?? window.innerHeight;

  const clampedStyle = {
    left: `${clamp(panelPosition.x, 0, maxWidth - 260)}px`,
    top: `${clamp(panelPosition.y, 0, maxHeight - 160)}px`,
  };

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
              />
            </label>
            <label>
              Hauteur:
              <input
                type="number"
                name="height"
                value={zoneData.height}
                onChange={handleInputChange}
              />
            </label>
          </div>
        )}

        <button onClick={handleReset}>🔁 Réinitialiser</button>
      </div>
    </div>
  );
};

export default FloatingBuilderPanel;
