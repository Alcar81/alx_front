// 📁 src/store/pageBuilderStore.ts

import { create } from "zustand";

export type BlockType = "TextBlock" | "ImageBlock" | "DraggableBlock"; // ✅ Tu pourras ajouter d'autres types plus tard

export interface PageBlock {
  id: string; // Identifiant unique
  type: BlockType;
}

interface PageBuilderStore {
  blocks: PageBlock[];
  addBlock: (type: BlockType) => void;
  removeBlock: (id: string) => void;
  clearBlocks: () => void;
  moveBlock: (fromIndex: number, toIndex: number) => void;
}

export const usePageBuilderStore = create<PageBuilderStore>((set) => ({
  blocks: [],

  addBlock: (type) =>
    set((state) => ({
      blocks: [...state.blocks, { id: crypto.randomUUID(), type }],
    })),

  removeBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((block) => block.id !== id),
    })),

  clearBlocks: () => set({ blocks: [] }),

  moveBlock: (fromIndex, toIndex) =>
    set((state) => {
      const updated = [...state.blocks];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return { blocks: updated };
    }),
}));
