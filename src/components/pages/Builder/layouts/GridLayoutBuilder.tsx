// 📁 Builder/GridLayoutBuilder.tsx

import React, { useRef, useState, useEffect } from "react";

// Stores
import { useLayoutStore } from "../store/layoutStore";
import { useBuilderStore } from "../store/builderStore";
import { usePageBuilderStore } from "../store/pageBuilderStore";

// Utils
import { generateLayoutCSSVars } from "../utils/generateLayoutCSSVars";

// Zones
import ZoneWrapper from "./zones/ZoneWrapper";

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

  // 🔷 Bloc fantôme
  const ghostBlock = usePageBuilderStore((s) => s.ghostBlock);
  const updateGhostPosition = usePageBuilderStore((s) => s.updateGhostPosition);
  const dropGhostBlock = usePageBuilderStore((s) => s.dropGhostBlock);

  // 🟦 Drag
  const draggingBlock = usePageBuilderStore((s) => s.draggingBlock);
  const updateDragging = usePageBuilderStore((s) => s.updateDragging);
  const stopDragging = usePageBuilderStore((s) => s.stopDragging);

  // 🟥 Resize
  const resizingBlock = usePageBuilderStore((s) => s.resizingBlock);
  const updateResizing = usePageBuilderStore((s) => s.updateResizing);
  const stopResizing = usePageBuilderStore((s) => s.stopResizing);

  // 👆 Gestion des mouvements globaux
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ghostBlock) updateGhostPosition({ x: e.clientX, y: e.clientY });
      if (draggingBlock) updateDragging(e.clientX, e.clientY);
      if (resizingBlock) updateResizing(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      if (ghostBlock) dropGhostBlock();
      if (draggingBlock) stopDragging();
      if (resizingBlock) stopResizing();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    ghostBlock,
    draggingBlock,
    resizingBlock,
    updateGhostPosition,
    dropGhostBlock,
    updateDragging,
    stopDragging,
    updateResizing,
    stopResizing,
  ]);

  // 📏 Position initiale
  useEffect(() => {
    if (surfaceRefFull.current && !initialized) {
      const rect = surfaceRefFull.current.getBoundingClientRect();
      setSurfaceOffset({ x: rect.left, y: rect.top });
      setInitialized(true);
    }
  }, [initialized, setSurfaceOffset]);

  return (
    <div className="grid-builder-wrapper">
      <div
        className="surface-active"
        ref={surfaceRefFull}
        onMouseDown={() => {
          // ⛔ Clique dans le vide ➜ désélectionner tout bloc actif
          usePageBuilderStore.getState().setSelectedBlock(null);
        }}
      >
        <div className="grid-layout-builder" style={styleVars}>
          {layout.header.visible && (
            <ZoneWrapper
              zoneKey="header"
              title="🔷 En-tête (Header)"
              tag="header"
              surfaceRefZone={surfaceRefZoneHeader}
              resizable
            />
          )}

          <ZoneWrapper
            zoneKey="main"
            title="🧱 Zone principale (Main)"
            tag="main"
            surfaceRefZone={surfaceRefZoneMain}
          />

          {layout.footer.visible && (
            <ZoneWrapper
              zoneKey="footer"
              title="🔻 Pied de page (Footer)"
              tag="footer"
              surfaceRefZone={surfaceRefZoneFooter}
              resizable
            />
          )}
        </div>

        {/* Bloc fantôme */}
        <GhostBlock />

        {/* Grille visuelle */}
        {showGrid && <FullGridOverlay surfaceRef={surfaceRefFull} />}

        {/* Boutons visibilité */}
        <TogglePanelsButton onClick={() => setPanelsVisible((v) => !v)} isVisible={panelsVisible} />
        <ToggleGridButton onClick={() => setShowGrid((g) => !g)} isVisible={showGrid} />

        {/* Panneaux flottants */}
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
