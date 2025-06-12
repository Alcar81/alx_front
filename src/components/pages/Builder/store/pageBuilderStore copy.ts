// 📁 Builder/store/pageBuilderStore.ts

import { createWithEqualityFn } from "zustand/traditional";
import { defaultBlockStyle } from "../constants/blockDefaults";
import type { GhostBlock } from "../types/GhostBlockTypes";
import type { PageBlock, BlockType } from "../types/blockTypes";
import type { BlockStyle } from "../types/blockStyles";
import type { ZoneKey } from "../types/zoneTypes";
import { mapBlockIdToComponent } from "../utils/mapBlockIdToComponent";
import ImageBlock400x200 from "../icons/400x200.svg";

const generateUUID = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

interface PageBuilderStore {
  blocks: PageBlock[];
  ghostBlock: GhostBlock | null;
  selectedBlockId: string | null;
  zoneRefs: Record<ZoneKey, DOMRect | null>;

  setZoneRefs: (refs: Record<ZoneKey, DOMRect | null>) => void;
  addBlock: (zone: ZoneKey, type: BlockType) => void;
  removeBlock: (id: string) => void;
  clearBlocks: () => void;
  moveBlock: (fromIndex: number, toIndex: number, zone: ZoneKey) => void;
  updateBlock: (id: string, updates: Partial<PageBlock>) => void;
  updateBlockStyle: (id: string, style: Partial<BlockStyle>) => void;

  setSelectedBlock: (id: string | null) => void;
  getBlocksByZone: (zone: ZoneKey) => PageBlock[];

  setGhostBlock: (ghost: GhostBlock | null) => void;
  updateGhostPosition: (position: { x: number; y: number }) => void;
  dropGhostBlock: () => void;

  draggingBlock: { id: string; offsetX: number; offsetY: number } | null;
  resizingBlock: {
    id: string;
    startX: number;
    startY: number;
    initialWidth: number;
    initialHeight: number;
  } | null;

  startDragging: (id: string, startX: number, startY: number) => void;
  updateDragging: (x: number, y: number) => void;
  stopDragging: () => void;

  startResizing: (id: string, startX: number, startY: number) => void;
  updateResizing: (x: number, y: number) => void;
  stopResizing: () => void;
}

export const usePageBuilderStore = createWithEqualityFn<PageBuilderStore>((set, get) => ({
  blocks: [],
  ghostBlock: null,
  selectedBlockId: null,
  draggingBlock: null,
  resizingBlock: null,
  zoneRefs: { header: null, main: null, footer: null },

  setZoneRefs: (refs) => set({ zoneRefs: refs }),

  addBlock: (zone, type) => {
    const existingZoneBlocks = get().blocks.filter((b) => b.zone === zone);
    const order = existingZoneBlocks.length;
    const style: BlockStyle = {
      ...defaultBlockStyle,
      top: defaultBlockStyle.top + order * 20,
      left: defaultBlockStyle.left + order * 20,
    };

    const newBlock: PageBlock = {
      id: generateUUID(),
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
      blocks: state.blocks.filter((block) => block.id !== id),
      selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId,
    })),

  clearBlocks: () => set({ blocks: [], selectedBlockId: null }),

  moveBlock: (fromIndex, toIndex, zone) => {
    const existingZoneBlocks = get()
      .blocks.filter((b) => b.zone === zone)
      .sort((a, b) => a.order - b.order);

    const [moved] = existingZoneBlocks.splice(fromIndex, 1);
    existingZoneBlocks.splice(toIndex, 0, moved);
    const reordered = existingZoneBlocks.map((b, i) => ({ ...b, order: i }));
    const rest = get().blocks.filter((b) => b.zone !== zone);
    set({ blocks: [...rest, ...reordered] });
  },

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
              } as BlockStyle,
            }
          : b
      ),
    })),

  setSelectedBlock: (id) => set({ selectedBlockId: id }),

  getBlocksByZone: (zone) =>
    get()
      .blocks.filter((b) => b.zone === zone)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),

  setGhostBlock: (ghost) => set({ ghostBlock: ghost }),

  updateGhostPosition: (position) =>
    set((state) => {
      if (!state.ghostBlock) return {};
      return { ghostBlock: { ...state.ghostBlock, position } };
    }),

  dropGhostBlock: () => {
    const ghost = get().ghostBlock;
    if (!ghost) return;

    const refs = get().zoneRefs;
    const blockX = ghost.position.x;
    const blockY = ghost.position.y;
    const blockW = ghost.size?.width || 120;
    const blockH = ghost.size?.height || 50;

    let dominantZone: ZoneKey | null = null;
    let maxIntersectionArea = 0;

    for (const zone of Object.keys(refs) as ZoneKey[]) {
      const ref = refs[zone];
      if (!ref) continue;

      const zoneRect = ref;
      const xOverlap = Math.max(
        0,
        Math.min(zoneRect.right, blockX + blockW) - Math.max(zoneRect.left, blockX)
      );
      const yOverlap = Math.max(
        0,
        Math.min(zoneRect.bottom, blockY + blockH) - Math.max(zoneRect.top, blockY)
      );
      const area = xOverlap * yOverlap;

      if (area > maxIntersectionArea) {
        dominantZone = zone;
        maxIntersectionArea = area;
      }
    }

    const blockArea = blockW * blockH;
    if (!dominantZone || maxIntersectionArea < blockArea * 0.5) return;

    if (blockX + blockW < 0 || blockX > window.innerWidth) return;

    if (dominantZone !== "main") {
      const ref = refs[dominantZone];
      if (ref && blockY + blockH > ref.bottom) return;
    }

    const existingZoneBlocks = get().blocks.filter((b) => b.zone === dominantZone);
    const order = existingZoneBlocks.length;
    const type = mapBlockIdToComponent(ghost.type);

    const newBlock: PageBlock = {
      id: generateUUID(),
      type,
      zone: dominantZone,
      order,
      content: type === "VisualTextBlock" ? ghost.label || "Texte" : undefined,
      src: type === "VisualImageBlock" ? ImageBlock400x200 : undefined,
      style: {
        ...defaultBlockStyle,
        top: blockY,
        left: blockX,
        width: blockW,
        height: blockH,
      },
    };

    set((state) => ({
      blocks: [...state.blocks, newBlock],
      ghostBlock: null,
      selectedBlockId: newBlock.id,
    }));
  },

  startDragging: (id, startX, startY) => {
    const block = get().blocks.find((b) => b.id === id);
    if (!block?.style) return;
    const offsetX = startX - (block.style.left ?? 0);
    const offsetY = startY - (block.style.top ?? 0);
    set({ draggingBlock: { id, offsetX, offsetY } });
  },

  updateDragging: (x, y) => {
    const dragging = get().draggingBlock;
    if (!dragging) return;
    const newLeft = x - dragging.offsetX;
    const newTop = y - dragging.offsetY;
    get().updateBlockStyle(dragging.id, { left: newLeft, top: newTop });
  },

  stopDragging: () => set({ draggingBlock: null }),

  startResizing: (id, startX, startY) => {
    const block = get().blocks.find((b) => b.id === id);
    if (!block?.style) return;
    set({
      resizingBlock: {
        id,
        startX,
        startY,
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
    const newWidth = Math.max(40, resizing.initialWidth + deltaX);
    const newHeight = Math.max(20, resizing.initialHeight + deltaY);
    get().updateBlockStyle(resizing.id, { width: newWidth, height: newHeight });
  },

  stopResizing: () => set({ resizingBlock: null }),
}));
