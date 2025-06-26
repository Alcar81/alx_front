// 📁 Builder/store/builderPanelsStore.ts

import { createWithEqualityFn } from "zustand/traditional";
import { defaultBlockStyle } from "../constants/blockDefaults";
import { mapBlockIdToComponent } from "../utils/mapBlockIdToComponent";

import type { BuilderPanelsState } from "../types/builderStorePanelsTypes";
import type { LayoutZoneKey } from "../types/zoneTypes";
import type { BlockStyle } from "../types/blockStyles";
import type { PageBlock } from "../types/blockTypes";
import ImageBlock400x200 from "../icons/400x200.svg";

function detectDominantZone(
  x: number,
  y: number,
  width: number,
  height: number,
  refs: Record<LayoutZoneKey, DOMRect | null>
): LayoutZoneKey | null {
  let bestZone: LayoutZoneKey | null = null;
  let bestArea = 0;

  for (const zone of Object.keys(refs) as LayoutZoneKey[]) {
    const ref = refs[zone];
    if (!ref) continue;
    const xOverlap = Math.max(0, Math.min(ref.right, x + width) - Math.max(ref.left, x));
    const yOverlap = Math.max(0, Math.min(ref.bottom, y + height) - Math.max(ref.top, y));
    const area = xOverlap * yOverlap;
    if (area > bestArea) {
      bestZone = zone;
      bestArea = area;
    }
  }

  const blockArea = width * height;
  return bestArea >= blockArea * 0.5 ? bestZone : null;
}

export const useBuilderPanelsStore = createWithEqualityFn<BuilderPanelsState>((set, get) => ({
  isDraggingBlock: false,
  isGhostingBlock: false,

  selectedZone: "main",
  hoveredZone: null,
  surfaceOffset: { x: 0, y: 0 },
  surfaceSize: { width: 1600, height: 1000 },

  zones: {
    header: { x: 0, y: 0, width: 1200, height: 80 },
    main: { x: 0, y: 80, width: 1200, height: "auto", heightMainAdd: 0 },
    footer: { x: 0, y: 680, width: 1200, height: 60 },
  },
  zoneRealHeights: { header: 0, main: 0, footer: 0 },
  zoneHeightDiffs: { header: 0, main: 0, footer: 0 },

  zoneRefs: { header: null, main: null, footer: null },
  surfaceBlockRect: null,
  hoveredZoneKey: null,
  lastValidHoveredZoneKey: "main",

  blocks: [],
  ghostBlock: null,
  selectedBlockId: null,

  draggingBlock: null,
  resizingBlock: null,

  setSurfaceOffset: (offset) => set({ surfaceOffset: offset }),
  setSurfaceSize: (size) => set({ surfaceSize: size }),
  setSelectedZone: (zone) => set({ selectedZone: zone }),
  setHoveredZone: (zone) => set({ hoveredZone: zone }),
  setZoneRefs: (refs) => set({ zoneRefs: refs }),
  setSurfaceBlockRect: (rect) => set({ surfaceBlockRect: rect }),
  setLastValidHoveredZoneKey: (zone: LayoutZoneKey) => set({ lastValidHoveredZoneKey: zone }),
  setHoveredZoneKey: (zone) =>
    set((state) => ({
      hoveredZoneKey: zone,
      lastValidHoveredZoneKey: zone ?? state.lastValidHoveredZoneKey,
    })),

  updateZone: (zone, data) =>
    set((state) => {
      const current = state.zones[zone];
      const newHeight =
        data.height === "auto"
          ? "auto"
          : typeof data.height === "number"
            ? Math.max(40, data.height)
            : typeof current.height === "number"
              ? Math.max(40, current.height)
              : 40;

      const updatedZone = {
        ...current,
        x: Math.max(0, data.x ?? current.x),
        y: Math.max(0, data.y ?? current.y),
        width: Math.max(100, data.width ?? current.width),
        height: newHeight,
        heightMainAdd:
          zone === "main"
            ? typeof data.heightMainAdd === "number"
              ? Math.max(0, data.heightMainAdd)
              : current.heightMainAdd || 0
            : undefined,
      };

      return {
        zones: {
          ...state.zones,
          [zone]: updatedZone,
        },
      };
    }),

  setZoneRealHeight: (zone, realHeight) =>
    set((state) => {
      const expected = state.zones[zone]?.height;
      const expectedNum = expected === "auto" ? 0 : expected;
      const diff = realHeight - expectedNum;
      return {
        zoneRealHeights: {
          ...state.zoneRealHeights,
          [zone]: realHeight,
        },
        zoneHeightDiffs: {
          ...state.zoneHeightDiffs,
          [zone]: diff,
        },
      };
    }),

  resetLayout: () => {
    const { x: ox, y: oy } = get().surfaceOffset;
    const width = 1200;
    set(() => ({
      zones: {
        header: { x: ox, y: oy, width, height: 80 },
        main: { x: ox, y: oy + 80, width, height: "auto", heightMainAdd: 0 },
        footer: { x: ox, y: oy + 680, width, height: 60 },
      },
      zoneRealHeights: { header: 0, main: 0, footer: 0 },
      zoneHeightDiffs: { header: 0, main: 0, footer: 0 },
    }));
  },

  addBlock: (zone, type) => {
    const existing = get().blocks.filter((b) => b.zone === zone);
    const order = existing.length;
    const style: BlockStyle = {
      ...defaultBlockStyle,
      top: defaultBlockStyle.top + order * 20,
      left: defaultBlockStyle.left + order * 20,
    };
    const newBlock: PageBlock = {
      id: crypto.randomUUID(),
      type,
      zone,
      order,
      content: type === "VisualTextBlock" ? "Texte exemple" : undefined,
      src: type === "VisualImageBlock" ? ImageBlock400x200 : undefined,
      style,
    };
    set((state) => ({ blocks: [...state.blocks, newBlock] }));
  },

  removeBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((b) => b.id !== id),
      selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId,
    })),

  clearBlocks: () => set({ blocks: [], selectedBlockId: null }),

  updateBlock: (id, updates) =>
    set((state) => ({
      blocks: state.blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    })),

  updateBlockStyle: (id, style) =>
    set((state) => ({
      blocks: state.blocks.map((b) =>
        b.id === id
          ? {
              ...b,
              style: {
                ...defaultBlockStyle,
                ...(b.style ?? {}),
                ...style,
              },
            }
          : b
      ),
    })),

  setSelectedBlock: (id) => set({ selectedBlockId: id }),
  setGhostBlock: (ghost) => set({ ghostBlock: ghost, isGhostingBlock: true }),

  updateGhostPosition: (pos) => {
    const ghost = get().ghostBlock;
    if (!ghost) return;
    const { width = 120, height = 50 } = ghost.size || {};
    const zone = detectDominantZone(pos.x, pos.y, width, height, get().zoneRefs);
    set((state) => ({
      ghostBlock: { ...ghost, position: pos },
      hoveredZoneKey: zone || null,
      lastValidHoveredZoneKey: zone || state.lastValidHoveredZoneKey,
    }));
  },

  dropGhostBlock: () => {
    const ghost = get().ghostBlock;
    const surface = get().surfaceBlockRect;
    const refs = get().zoneRefs;
    if (!ghost || !surface) return;

    const { x, y } = ghost.position;
    const w = ghost.size?.width || 120;
    const h = ghost.size?.height || 50;

    if (x < surface.left || x + w > surface.right) return;

    const zone = detectDominantZone(x, y, w, h, refs) || get().lastValidHoveredZoneKey;
    if (!zone) return;

    // ✅ Limite spéciale pour la zone "main"
    if (zone === "main") {
      const { zones, zoneRealHeights } = get();
      const mainZone = zones.main;
      const ref = refs.main;

      if (!ref || typeof ref.top !== "number") return;

      const heightOrigin = zoneRealHeights.main || 0;
      const heightAdd = mainZone.heightMainAdd || 0;
      const maxY = ref.top + heightOrigin + heightAdd;

      if (typeof maxY === "number" && y + h > maxY) {
        console.warn("Bloc refusé : dépasse la hauteur visible de la zone main.");
        return;
      }
    }

    // ✅ Pour les autres zones, on évite le débordement vertical
    if (zone !== "main") {
      const ref = refs[zone];
      if (ref && y + h > ref.bottom + 10) return;
    }

    const type = mapBlockIdToComponent(ghost.type);
    const order = get().blocks.filter((b) => b.zone === zone).length;

    const newBlock: PageBlock = {
      id: crypto.randomUUID(),
      type,
      zone,
      order,
      content: type === "VisualTextBlock" ? ghost.label || "Texte" : undefined,
      src: type === "VisualImageBlock" ? ImageBlock400x200 : undefined,
      style: {
        ...defaultBlockStyle,
        top: y,
        left: x,
        width: w,
        height: h,
      },
    };

    set((state) => ({
      blocks: [...state.blocks, newBlock],
      ghostBlock: null,
      isGhostingBlock: false,
      selectedBlockId: newBlock.id,
      hoveredZoneKey: null,
    }));
  },

  startDragging: (id, sx, sy) => {
    const block = get().blocks.find((b) => b.id === id);
    if (!block?.style) return;
    const offsetX = sx - (block.style.left ?? 0);
    const offsetY = sy - (block.style.top ?? 0);
    set({ draggingBlock: { id, offsetX, offsetY }, isDraggingBlock: true });
  },

  updateDragging: (x, y) => {
    const dragging = get().draggingBlock;
    const surface = get().surfaceBlockRect;
    const refs = get().zoneRefs;
    if (!dragging || !surface) return;

    const block = get().blocks.find((b) => b.id === dragging.id);
    if (!block?.style) return;

    const w = block.style.width ?? 120;
    const h = block.style.height ?? 50;

    let left = x - dragging.offsetX;
    let top = y - dragging.offsetY;

    left = Math.max(surface.left, Math.min(left, surface.right - w));
    top = Math.max(surface.top, Math.min(top, surface.bottom - h));

    const centerX = left + w / 2;
    const centerY = top + h / 2;
    const zone = detectDominantZone(centerX, centerY, 1, 1, refs);

    if (zone && zone !== block.zone) {
      get().updateBlock(dragging.id, { zone });
    }

    set({ hoveredZoneKey: zone || null });
    get().updateBlockStyle(dragging.id, { left, top });
  },

  stopDragging: () => set({ draggingBlock: null, isDraggingBlock: false }),

  startResizing: (id, sx, sy) => {
    const block = get().blocks.find((b) => b.id === id);
    if (!block?.style) return;
    set({
      resizingBlock: {
        id,
        startX: sx,
        startY: sy,
        initialWidth: block.style.width ?? 120,
        initialHeight: block.style.height ?? 50,
      },
    });
  },

  updateResizing: (x, y) => {
    const resizing = get().resizingBlock;
    if (!resizing) return;
    const deltaX = x - resizing.startX;
    const deltaY = y - resizing.startY;
    const w = Math.max(40, resizing.initialWidth + deltaX);
    const h = Math.max(20, resizing.initialHeight + deltaY);
    get().updateBlockStyle(resizing.id, { width: w, height: h });
  },

  stopResizing: () => set({ resizingBlock: null }),
}));
