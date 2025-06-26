// 📁 Builder/components/Builder/types/builderStorePanelsTypes.ts

import type { LayoutZoneKey } from "./zoneTypes";
import type { GhostBlock } from "./GhostBlockTypes";
import type { PageBlock, BlockType } from "./blockTypes";
import type { BlockStyle } from "./blockStyles";

// 📏 Hauteur configurable
export type LayoutHeightValue = number | "auto";

// 📦 Données de chaque zone
export interface ZoneData {
  x: number;
  y: number;
  width: number;
  height: LayoutHeightValue;
  realHeight?: number;
  heightMainAdd?: number;
}

// 🧠 Structure complète du store
export interface BuilderPanelsState {
  // Zones et layout
  zones: Record<LayoutZoneKey, ZoneData>;
  selectedZone: LayoutZoneKey | null;
  hoveredZone: LayoutZoneKey | null;
  zoneRealHeights: Record<LayoutZoneKey, number>;
  zoneHeightDiffs: Record<LayoutZoneKey, number>;

  surfaceOffset: { x: number; y: number };
  surfaceSize: { width: number; height: number };

  // Références DOM
  zoneRefs: Record<LayoutZoneKey, DOMRect | null>;
  surfaceBlockRect: DOMRect | null;
  hoveredZoneKey: LayoutZoneKey | null;
  lastValidHoveredZoneKey: LayoutZoneKey | null;

  // Blocs
  blocks: PageBlock[];
  ghostBlock: GhostBlock | null;
  selectedBlockId: string | null;
  isDraggingBlock: boolean;
  isGhostingBlock: boolean;

  // Actions UI
  draggingBlock: { id: string; offsetX: number; offsetY: number } | null;
  resizingBlock: {
    id: string;
    startX: number;
    startY: number;
    initialWidth: number;
    initialHeight: number;
  } | null;

  // ✅ Setters généraux
  setSurfaceOffset: (offset: { x: number; y: number }) => void;
  setSurfaceSize: (size: { width: number; height: number }) => void;
  setSelectedZone: (zone: LayoutZoneKey | null) => void;
  setHoveredZone: (zone: LayoutZoneKey | null) => void;

  // Zones
  updateZone: (zone: LayoutZoneKey, data: Partial<ZoneData>) => void;
  setZoneRealHeight: (zone: LayoutZoneKey, realHeight: number) => void;
  resetLayout: () => void;

  // Zones DOM
  setZoneRefs: (refs: Record<LayoutZoneKey, DOMRect | null>) => void;
  setSurfaceBlockRect: (rect: DOMRect | null) => void;
  setHoveredZoneKey: (zone: LayoutZoneKey | null) => void;

  // Blocs
  addBlock: (zone: LayoutZoneKey, type: BlockType) => void;
  removeBlock: (id: string) => void;
  clearBlocks: () => void;
  updateBlock: (id: string, updates: Partial<PageBlock>) => void;
  updateBlockStyle: (id: string, style: Partial<BlockStyle>) => void;

  setSelectedBlock: (id: string | null) => void;
  setGhostBlock: (ghost: GhostBlock | null) => void;
  updateGhostPosition: (position: { x: number; y: number }) => void;
  dropGhostBlock: () => void;

  // Drag / Resize
  startDragging: (id: string, startX: number, startY: number) => void;
  updateDragging: (x: number, y: number) => void;
  stopDragging: () => void;

  startResizing: (id: string, startX: number, startY: number) => void;
  updateResizing: (x: number, y: number) => void;
  stopResizing: () => void;
}
