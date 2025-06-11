// 📁 Builder/GridLayoutBuilder.tsx

import React, { useRef, useState, useEffect, useCallback } from "react";

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
  const { setSurfaceOffset, setSurfaceSize } = useBuilderStore();
  const styleVars = generateLayoutCSSVars();

  const surfaceRefFull = useRef<HTMLDivElement>(null);
  const surfaceRefZoneHeader = useRef<HTMLDivElement>(null);
  const surfaceRefZoneMain = useRef<HTMLDivElement>(null);
  const surfaceRefZoneFooter = useRef<HTMLDivElement>(null);

  const [initialized, setInitialized] = useState(false);
  const [panelsVisible, setPanelsVisible] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  // 🟦 Bloc fantôme
  const ghostBlock = usePageBuilderStore((s) => s.ghostBlock);
  const updateGhostPosition = usePageBuilderStore((s) => s.updateGhostPosition);
  const dropGhostBlock = usePageBuilderStore((s) => s.dropGhostBlock);

  // 🟪 Bloc déplacé
  const draggingBlock = usePageBuilderStore((s) => s.draggingBlock);
  const updateDragging = usePageBuilderStore((s) => s.updateDragging);
  const stopDragging = usePageBuilderStore((s) => s.stopDragging);

  // 🟥 Bloc redimensionné
  const resizingBlock = usePageBuilderStore((s) => s.resizingBlock);
  const updateResizing = usePageBuilderStore((s) => s.updateResizing);
  const stopResizing = usePageBuilderStore((s) => s.stopResizing);

  // ❌ Bloc sélectionné
  const setSelectedBlock = usePageBuilderStore((s) => s.setSelectedBlock);

  // 📦 Zones DOMRect
  const setZoneRefs = usePageBuilderStore((s) => s.setZoneRefs);

  const updateZoneDimensions = useCallback(() => {
    setZoneRefs({
      header: surfaceRefZoneHeader.current?.getBoundingClientRect() || null,
      main: surfaceRefZoneMain.current?.getBoundingClientRect() || null,
      footer: surfaceRefZoneFooter.current?.getBoundingClientRect() || null,
    });
  }, [setZoneRefs, surfaceRefZoneHeader, surfaceRefZoneMain, surfaceRefZoneFooter]);

  // 🖱️ Mouvements globaux
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

  // ⌨️ Raccourci clavier : ESC désélectionne
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedBlock(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSelectedBlock]);

  // 📐 Initialisation de la surface
  useEffect(() => {
    if (surfaceRefFull.current && !initialized) {
      const rect = surfaceRefFull.current.getBoundingClientRect();
      setSurfaceOffset({ x: rect.left, y: rect.top });
      setSurfaceSize({ width: rect.width, height: rect.height });
      setInitialized(true);
    }
  }, [initialized, setSurfaceOffset, setSurfaceSize]);

  // 🔁 Mise à jour dynamique des zones visibles
  useEffect(() => {
    updateZoneDimensions();
    window.addEventListener("resize", updateZoneDimensions);
    return () => window.removeEventListener("resize", updateZoneDimensions);
  }, [layout.header.visible, layout.footer.visible, updateZoneDimensions]);

  return (
    <div className="grid-builder-wrapper">
      <div
        className="surface-active"
        ref={surfaceRefFull}
        onMouseDown={() => {
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

        <GhostBlock />

        {showGrid && <FullGridOverlay surfaceRef={surfaceRefFull} />}

        <TogglePanelsButton onClick={() => setPanelsVisible((v) => !v)} isVisible={panelsVisible} />
        <ToggleGridButton onClick={() => setShowGrid((g) => !g)} isVisible={showGrid} />

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
