// 📁 src/components/pages/Builder/GridLayoutBuilder.tsx

import React, { useRef, useState, useEffect } from "react";

// Stores
import { useLayoutStore } from "../../../store/layoutStore";
import { useBuilderStore } from "../../../store/builderStore";

// Utils
import { generateLayoutCSSVars } from "../../../utils/generateLayoutCSSVars";

// Zones
import HeaderZone from "../Builder/zones/HeaderZone";
import MainZone from "../Builder/zones/MainZone";
import FooterZone from "../Builder/zones/FooterZone";

// Composants
import TogglePanelsButton from "../Builder/ui/TogglePanelsButton";
import FloatingBuilderPanel from "../Builder/panels/FloatingBuilderPanel";
import FloatingPagePanel from "../Builder/panels/FloatingPagePanel";

// CSS
import "./GridLayoutBuilder.css";

const GridLayoutBuilder: React.FC = () => {
  const layout = useLayoutStore((state) => state.layout);
  const { setSurfaceOffset } = useBuilderStore();
  const surfaceRef = useRef<HTMLDivElement>(null);
  const styleVars = generateLayoutCSSVars();

  const [initialized, setInitialized] = useState(false);
  const [panelsVisible, setPanelsVisible] = useState(true);

  useEffect(() => {
    if (surfaceRef.current && !initialized) {
      const rect = surfaceRef.current.getBoundingClientRect();
      setSurfaceOffset({ x: rect.left, y: rect.top });
      setInitialized(true);
    }
  }, [initialized, setSurfaceOffset]);

  return (
    <div className="grid-builder-wrapper">
      <div className="surface-active" ref={surfaceRef}>
        <div className="grid-layout-builder" style={styleVars}>
          {layout.header.visible && <HeaderZone surfaceRef={surfaceRef} />}
          <MainZone surfaceRef={surfaceRef} />
          {layout.footer.visible && <FooterZone surfaceRef={surfaceRef} />}
        </div>

        <TogglePanelsButton
          onClick={() => setPanelsVisible((v: boolean) => !v)}
          isVisible={panelsVisible}
        />

        {panelsVisible && (
          <div className="floating-panel-root">
            <FloatingBuilderPanel surfaceRef={surfaceRef} />
            <FloatingPagePanel surfaceRef={surfaceRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GridLayoutBuilder;
