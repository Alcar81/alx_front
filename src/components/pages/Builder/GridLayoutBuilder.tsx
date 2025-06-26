// 📁 Builder/GridLayoutBuilder.tsx
import React, { useRef, useState, useEffect, useCallback } from "react";

// Stores
import { useLayoutStore } from "./store/layoutStore";
import { useBuilderPanelsStore } from "./store/builderPanelsStore";

// Utils
import { generateLayoutCSSVars } from "./utils/generateLayoutCSSVars";

// Zones
import ZoneWrapper from "./layouts/zones/ZoneWrapper";

// Composants
import TogglePanelsButton from "./ui/TogglePanelsButton";
import ToggleGridButton from "./ui/ToggleGridButton";
import FullGridOverlay from "./ui/FullGridOverlay";
import MainExpandControls from "./ui/MainExpandControls";
import FloatingBuilderPanel from "./panels/FloatingBuilderPanel/FloatingBuilderPanel";
import FloatingPagePanel from "./panels/FloatingPagePanel";
import GhostBlock from "./ghost/GhostBlock";

// ✅ CSS principal
import "./GridLayoutBuilder.css";

const GridLayoutBuilder: React.FC = () => {
  const layout = useLayoutStore((state) => state.layout);
  const { setSurfaceOffset, setSurfaceSize } = useBuilderPanelsStore();

  const surfaceRefFull = useRef<HTMLDivElement>(null);
  const surfaceRefBlock = useRef<HTMLDivElement>(null);
  const surfaceRefZoneHeader = useRef<HTMLDivElement>(null);
  const surfaceRefZoneMain = useRef<HTMLDivElement>(null);
  const surfaceRefZoneFooter = useRef<HTMLDivElement>(null);

  const [initialized, setInitialized] = useState(false);
  const [panelsVisible, setPanelsVisible] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [surfaceHeight, setSurfaceHeight] = useState<number | null>(null);

  const {
    ghostBlock,
    updateGhostPosition,
    dropGhostBlock,
    draggingBlock,
    updateDragging,
    stopDragging,
    resizingBlock,
    updateResizing,
    stopResizing,
    setSelectedBlock,
    setZoneRefs,
    setSurfaceBlockRect,
  } = useBuilderPanelsStore();

  const updateZoneDimensions = useCallback(() => {
    setZoneRefs({
      header: surfaceRefZoneHeader.current?.getBoundingClientRect() || null,
      main: surfaceRefZoneMain.current?.getBoundingClientRect() || null,
      footer: surfaceRefZoneFooter.current?.getBoundingClientRect() || null,
    });
    setSurfaceBlockRect(surfaceRefBlock.current?.getBoundingClientRect() || null);
  }, [setZoneRefs, setSurfaceBlockRect]);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedBlock(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSelectedBlock]);

  useEffect(() => {
    if (surfaceRefFull.current && !initialized) {
      const rect = surfaceRefFull.current.getBoundingClientRect();
      setSurfaceOffset({ x: rect.left, y: rect.top });
      setSurfaceSize({ width: rect.width, height: rect.height });
      setSurfaceHeight(rect.height);
      setInitialized(true);
    }
  }, [initialized, setSurfaceOffset, setSurfaceSize]);

  useEffect(() => {
    updateZoneDimensions();
    window.addEventListener("resize", updateZoneDimensions);
    return () => window.removeEventListener("resize", updateZoneDimensions);
  }, [layout.header.visible, layout.footer.visible, updateZoneDimensions]);

  const styleVars = {
    ...generateLayoutCSSVars(),
    ...(surfaceHeight ? { minHeight: `${surfaceHeight}px` } : {}),
  };

  const layoutClass = [
    "grid-layout-builder",
    layout.main.height === "auto" && "main-auto-mode",
    layout.footerMode === "inline" && "footer-inline-mode",
    layout.footerMode === "none" && "footer-none-mode",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="grid-builder-wrapper">
      <div
        className="surface-active"
        ref={surfaceRefFull}
        onMouseDown={() => setSelectedBlock(null)}
      >
        <div ref={surfaceRefBlock}>
          <div className={layoutClass} style={styleVars}>
            {/* ✅ Header */}
            {layout.header.visible && (
              <ZoneWrapper
                zoneKey="header"
                title="🔷 En-tête (Header)"
                tag="header"
                surfaceRefZone={surfaceRefZoneHeader}
                resizable
              />
            )}

            {/* ✅ Main */}
            {layout.footerMode === "inline" ? (
              <main className="grid-main" ref={surfaceRefZoneMain}>
                <div className="main-container" data-zone="main">
                  <ZoneWrapper
                    zoneKey="main"
                    title="🧱 Zone principale (Main) Footer intégré"
                    tag="div"
                    surfaceRefZone={surfaceRefZoneMain}
                    resizable={false}
                  />
                </div>
                <div className="footer-container-inline">
                  <ZoneWrapper
                    zoneKey="footer"
                    title="🔻 Pied de page (Footer intégré)"
                    tag="footer"
                    surfaceRefZone={surfaceRefZoneFooter}
                    resizable
                  />
                </div>
              </main>
            ) : (
              <ZoneWrapper
                zoneKey="main"
                title="🧱 Zone principale (Main) Footer fixe"
                tag="main"
                surfaceRefZone={surfaceRefZoneMain}
              />
            )}

            {/* ✅ Footer fixe */}
            {layout.footerMode === "fixed" && layout.footer.visible && (
              <ZoneWrapper
                zoneKey="footer"
                title="🔻 Pied de page (Footer fixe)"
                tag="footer"
                surfaceRefZone={surfaceRefZoneFooter}
                resizable
              />
            )}
          </div>
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
        <MainExpandControls />
      </div>
    </div>
  );
};

export default GridLayoutBuilder;
