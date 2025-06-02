// 📁 Builder/GridLayoutBuilder.tsx

import React, { useRef, useState, useEffect } from "react";

// Stores
import { useLayoutStore } from "../store/layoutStore";
import { useBuilderStore } from "../store/builderStore";

// Utils
import { generateLayoutCSSVars } from "../utils/generateLayoutCSSVars";

// Zones
import HeaderZone from "./zones/HeaderZone";
import MainZone from "./zones/MainZone";
import FooterZone from "./zones/FooterZone";

// Composants
import TogglePanelsButton from "../ui/TogglePanelsButton";
import ToggleGridButton from "../ui/ToggleGridButton";
import FullGridOverlay from "../ui/FullGridOverlay";
import FloatingBuilderPanel from "../panels/FloatingBuilderPanel";
import FloatingPagePanel from "../panels/FloatingPagePanel";
import GhostBlock from "../ghost/GhostBlock";

// CSS
import "./GridLayoutBuilder.css";

const GridLayoutBuilder: React.FC = () => {
  const layout = useLayoutStore((state) => state.layout);
  const { setSurfaceOffset } = useBuilderStore();
  const styleVars = generateLayoutCSSVars();

  const surfaceRefFull = useRef<HTMLDivElement>(null);
  const surfaceRefZoneHeader = useRef<HTMLDivElement>(null);
  const surfaceRefZoneMain = useRef<HTMLDivElement>(null);
  const surfaceRefZoneFooter = useRef<HTMLDivElement>(null);

  const [initialized, setInitialized] = useState(false);
  const [panelsVisible, setPanelsVisible] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  useEffect(() => {
    if (surfaceRefFull.current && !initialized) {
      const rect = surfaceRefFull.current.getBoundingClientRect();
      setSurfaceOffset({ x: rect.left, y: rect.top });
      setInitialized(true);
    }
  }, [initialized, setSurfaceOffset]);

  return (
    <div className="grid-builder-wrapper">
      <div className="surface-active" ref={surfaceRefFull}>
        <div className="grid-layout-builder" style={styleVars}>
          {layout.header.visible && (
            <HeaderZone surfaceRefZone={surfaceRefZoneHeader} />
          )}
          <MainZone surfaceRefZone={surfaceRefZoneMain} />
          {layout.footer.visible && (
            <FooterZone surfaceRefZone={surfaceRefZoneFooter} />
          )}
        </div>

        <GhostBlock />

        {showGrid && <FullGridOverlay surfaceRef={surfaceRefFull} />}

        <TogglePanelsButton
          onClick={() => setPanelsVisible((v) => !v)}
          isVisible={panelsVisible}
        />
        <ToggleGridButton
          onClick={() => setShowGrid((g) => !g)}
          isVisible={showGrid}
        />

        {panelsVisible && (
          <div className="floating-panel-root">
            <FloatingBuilderPanel surfaceRef={surfaceRefFull} />
            <FloatingPagePanel surfaceRef={surfaceRefFull} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GridLayoutBuilder;
