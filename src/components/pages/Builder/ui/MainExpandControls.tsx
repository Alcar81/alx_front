// 📁 Builder/components/Builder/ui/MainExpandControls.tsx

import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useLayoutStore } from "../store/layoutStore";
import { useResizableZone } from "../hooks/useResizableZone";
import { useBuilderPanelsStore } from "../store/builderPanelsStore";

import "./MainExpandControls.css";

const MainExpandControls: React.FC = () => {
  const layout = useLayoutStore((s) => s.layout);
  const isMainAuto = layout.main?.height === "auto";
  const heightMainAdd = useBuilderPanelsStore((s) => s.zones.main.heightMainAdd || 0);

  const surfaceRef = React.useRef<HTMLDivElement>(null);
  const { adjustZoneHeight } = useResizableZone("main", surfaceRef);

  const [factor, setFactor] = useState(10);

  if (!isMainAuto) return null;

  return (
    <div className="main-expand-controls">
      <div className="control-group">
        <div className="controls-row">
          <button
            title="Réduire la hauteur"
            onClick={() => adjustZoneHeight(-factor)}
          >
            <RemoveIcon fontSize="small" />
          </button>
          <button
            title="Augmenter la hauteur"
            onClick={() => adjustZoneHeight(factor)}
          >
            <AddIcon fontSize="small" />
          </button>
        </div>
        <div className="controls-row">
          <select
            value={factor}
            onChange={(e) => setFactor(Number(e.target.value))}
            title="Multiplicateur"
          >
            <option value={1}>×1</option>
            <option value={10}>×10</option>
            <option value={100}>×100</option>
          </select>
          <span className="add-display">+{heightMainAdd}px</span>
        </div>
      </div>
    </div>
  );
};

export default MainExpandControls;
