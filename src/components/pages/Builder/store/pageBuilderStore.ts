// 📁 Builder/store/pageBuilderStore.ts

import { create } from "zustand";
import { defaultBlockStyle } from "../constants/blockDefaults";
import type { GhostBlock } from "../types/GhostBlockTypes";
import type { PageBlock, BlockType, BlockPosition } from "../types/blockTypes";
import type { BlockStyle } from "../types/blockStyles";

interface PageBuilderStore {
  blocks: PageBlock[];
  ghostBlock: GhostBlock | null;

  addBlock: (zone: BlockPosition, type: BlockType) => void;
  removeBlock: (id: string) => void;
  clearBlocks: () => void;
  moveBlock: (fromIndex: number, toIndex: number, zone: BlockPosition) => void;
  updateBlock: (id: string, updates: Partial<PageBlock>) => void;
  updateBlockStyle: (id: string, style: Partial<BlockStyle>) => void;

  selectedBlockId: string | null;
  setSelectedBlock: (id: string | null) => void;

  getBlocksByZone: (zone: BlockPosition) => PageBlock[];

  setGhostBlock: (ghost: GhostBlock | null) => void;
  updateGhostPosition: (position: { x: number; y: number }) => void;
}

export const usePageBuilderStore = create<PageBuilderStore>((set, get) => ({
  blocks: [],
  ghostBlock: null,
  selectedBlockId: null,

  addBlock: (zone, type) =>
    set((state) => {
      const zoneBlocks = state.blocks.filter((b) => b.zone === zone);
      const order = zoneBlocks.length;

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
        src: type === "ImageBlock" ? "https://via.placeholder.com/400x200" : undefined,
        style,
      };

      return { blocks: [...state.blocks, newBlock] };
    }),

  removeBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((block) => block.id !== id),
      selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId,
    })),

  clearBlocks: () => set({ blocks: [], selectedBlockId: null }),

  moveBlock: (fromIndex, toIndex, zone) =>
    set((state) => {
      const zoneBlocks = state.blocks
        .filter((b) => b.zone === zone)
        .sort((a, b) => a.order - b.order);

      const [moved] = zoneBlocks.splice(fromIndex, 1);
      zoneBlocks.splice(toIndex, 0, moved);

      const reordered = zoneBlocks.map((b, i) => ({ ...b, order: i }));
      const rest = state.blocks.filter((b) => b.zone !== zone);

      return { blocks: [...rest, ...reordered] };
    }),

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
      .sort((a, b) => a.order - b.order),

  setGhostBlock: (ghost) => set({ ghostBlock: ghost }),

  updateGhostPosition: (position) =>
    set((state) => {
      if (!state.ghostBlock) return {};
      return {
        ghostBlock: {
          ...state.ghostBlock,
          position,
        },
      };
    }),
}));
