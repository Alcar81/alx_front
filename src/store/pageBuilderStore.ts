// 📁 src/store/pageBuilderStore.ts

import { create } from "zustand";

export type BlockType = "TextBlock" | "ImageBlock" | "DraggableBlock";
export type ZoneKey = "header" | "main" | "footer";

export interface PageBlock {
  id: string;
  type: BlockType;
  zone: ZoneKey;
  content?: string;
  src?: string;
  style?: React.CSSProperties;
  order: number;
}

interface PageBuilderStore {
  blocks: PageBlock[];
  addBlock: (zone: ZoneKey, type: BlockType) => void;
  removeBlock: (id: string) => void;
  clearBlocks: () => void;
  moveBlock: (fromIndex: number, toIndex: number, zone: ZoneKey) => void;
  updateBlock: (id: string, updates: Partial<PageBlock>) => void;

  selectedBlockId: string | null;
  setSelectedBlock: (id: string | null) => void;

  // ✅ Utilisation manuelle (non-reactive)
  getBlocksByZone: (zone: ZoneKey) => PageBlock[];
}

export const usePageBuilderStore = create<PageBuilderStore>((set, get) => ({
  blocks: [],
  selectedBlockId: null,

  addBlock: (zone, type) =>
    set((state) => {
      const zoneBlocks = state.blocks.filter((b) => b.zone === zone);
      const newBlock: PageBlock = {
        id: crypto.randomUUID(),
        type,
        zone,
        order: zoneBlocks.length,
        content: type === "TextBlock" ? "Texte exemple" : undefined,
        src: type === "ImageBlock" ? "https://via.placeholder.com/400x200" : undefined,
        style: {},
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

  // ✅ Non utilisé dans hook
  getBlocksByZone: (zone) =>
    get()
      .blocks.filter((b) => b.zone === zone)
      .sort((a, b) => a.order - b.order),

  setSelectedBlock: (id) => set({ selectedBlockId: id }),
}));
