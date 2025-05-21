// 📁 src/components/pages/Builder/GridLayoutBuilder.tsx

import React, { useEffect, useRef, useState } from "react";
import "./GridLayoutBuilder.css";

import { useLayoutStore } from "../../../store/layoutStore";
import { useBuilderStore } from "../../../store/builderStore";
import { generateLayoutCSSVars } from "../../../utils/generateLayoutCSSVars";
import FloatingBuilderPanel from "./floatingBuilderPanel/FloatingBuilderPanel";
import FloatingPagePanel from "./floatingPagePanel/FloatingPagePanel";
import TogglePanelsButton from "../Builder/common/TogglePanelsButton"; // 👈 à créer
import { HeaderZone, MainZone, FooterZone } from "./zones";

const GridLayoutBuilder: React.FC = () => {
  const layout = useLayoutStore((state) => state.layout);
  const { resetLayout, setSurfaceOffset } = useBuilderStore();
  const surfaceRef = useRef<HTMLDivElement>(null);
  const styleVars = generateLayoutCSSVars();

  const [initialized, setInitialized] = useState(false);
  const [panelsVisible, setPanelsVisible] = useState(true);

  useEffect(() => {
    if (surfaceRef.current && !initialized) {
      const rect = surfaceRef.current.getBoundingClientRect();
      setSurfaceOffset({ x: rect.left, y: rect.top });
      resetLayout();
      setInitialized(true);
    }
  }, [initialized, resetLayout, setSurfaceOffset]);

  return (
    <div className="surface-windows" ref={surfaceRef}>
      <div className="surface-active">
        <div className="grid-layout-builder" style={styleVars}>
          {layout.header.visible && <HeaderZone surfaceRef={surfaceRef} />}
          <MainZone surfaceRef={surfaceRef} />
          {layout.footer.visible && <FooterZone surfaceRef={surfaceRef} />}
        </div>

        <TogglePanelsButton
          onClick={() => setPanelsVisible((v) => !v)}
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
