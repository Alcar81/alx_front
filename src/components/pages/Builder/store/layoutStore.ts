// 📁 Builder/store/layoutStore.ts

import { create } from "zustand";
import initialLayoutConfig from "../config/initialFullLayoutConfig";
import type { LayoutData } from "../types/layoutData";
import type { BlockItem } from "../types/blockTypes";

export type LayoutZoneKey = "header" | "main" | "footer";

export const MIN_HEIGHTS: Record<LayoutZoneKey, number> = {
  header: 40,
  main: 0,
  footer: 40,
};

export const MAX_HEIGHTS: Record<LayoutZoneKey, number> = {
  header: 200,
  main: 10000,
  footer: 300,
};

const LOCAL_STORAGE_KEY = "layout_config_v1";

interface LayoutStore {
  layout: LayoutData;
  setHeight: (section: LayoutZoneKey, height: string | number) => void;
  toggleSection: (section: LayoutZoneKey) => void;
  addBlockToSection: (section: LayoutZoneKey, block: BlockItem) => void;
  removeBlockFromSection: (section: LayoutZoneKey, blockId: string) => void;
  moveBlockInSection: (section: LayoutZoneKey, fromIndex: number, toIndex: number) => void;
  resetLayout: () => void;
  getLayout: () => LayoutData;
  resetAllLayout: () => void;
}

export const useLayoutStore = create<LayoutStore>((set, get) => {
  let parsed: LayoutData;

  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    parsed = stored ? JSON.parse(stored) : initialLayoutConfig;
  } catch {
    console.warn("❗Erreur de lecture localStorage ➜ fallback à la config initiale.");
    parsed = initialLayoutConfig;
  }

  const persist = (updated: LayoutData) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    set({ layout: updated });
  };

  return {
    layout: parsed,

    setHeight: (section, height) => {
      const numeric = typeof height === "string" ? parseInt(height, 10) : height;
      const clamped = Math.max(MIN_HEIGHTS[section], Math.min(MAX_HEIGHTS[section], numeric));
      const updated = {
        ...get().layout,
        [section]: {
          ...get().layout[section],
          height: `${clamped}px`,
        },
      };
      persist(updated);
    },

    toggleSection: (section) => {
      const layout = get().layout;
      const updated = {
        ...layout,
        [section]: {
          ...layout[section],
          visible: !layout[section].visible,
        },
      };
      persist(updated);
    },

    addBlockToSection: (section, block) => {
      const layout = get().layout;
      const blocks = layout[section].blocks || [];
      const updated = {
        ...layout,
        [section]: {
          ...layout[section],
          blocks: [...blocks, block],
        },
      };
      persist(updated);
    },

    removeBlockFromSection: (section, blockId) => {
      const layout = get().layout;
      const blocks = layout[section].blocks || [];
      const updated = {
        ...layout,
        [section]: {
          ...layout[section],
          blocks: blocks.filter((b) => b.id !== blockId),
        },
      };
      persist(updated);
    },

    moveBlockInSection: (section, fromIndex, toIndex) => {
      const layout = get().layout;
      const blocks = [...(layout[section].blocks || [])];

      if (fromIndex < 0 || fromIndex >= blocks.length || toIndex < 0 || toIndex >= blocks.length)
        return;

      const [moved] = blocks.splice(fromIndex, 1);
      blocks.splice(toIndex, 0, moved);

      const updated = {
        ...layout,
        [section]: {
          ...layout[section],
          blocks,
        },
      };
      persist(updated);
    },

    resetLayout: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      set({ layout: initialLayoutConfig });
    },

    resetAllLayout: () => {
      const layout = get().layout;
      const defaultHeights: Record<LayoutZoneKey, number> = {
        header: 80,
        footer: 60,
        main: 400,
      };

      const updated: LayoutData = { ...layout };

      (["header", "main", "footer"] as LayoutZoneKey[]).forEach((zone) => {
        updated[zone] = {
          ...updated[zone],
          height: `${defaultHeights[zone]}px`,
          visible: true,
        };
      });

      persist(updated);
    },

    getLayout: () => get().layout,
  };
});

export type { LayoutData };
