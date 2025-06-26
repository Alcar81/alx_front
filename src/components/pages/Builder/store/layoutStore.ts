// 📁 Builder/store/layoutStore.ts

import { create } from "zustand";
import initialLayoutConfig from "../config/initialFullLayoutConfig";
import type { LayoutData } from "../types/layoutData";
import type { BlockItem } from "../types/blockTypes";
import type { LayoutZoneKey } from "../types/zoneTypes";

import { DEFAULT_HEIGHTS, MIN_HEIGHTS, MAX_HEIGHTS } from "../constants/defaultHeights";

const LOCAL_STORAGE_KEY = "layout_config_v1";

interface LayoutStore {
  layout: LayoutData;
  setHeight: (section: LayoutZoneKey, height: string | number) => void;
  toggleSection: (section: LayoutZoneKey) => void;
  addBlockToSection: (section: LayoutZoneKey, block: BlockItem) => void;
  removeBlockFromSection: (section: LayoutZoneKey, blockId: string) => void;
  moveBlockInSection: (section: LayoutZoneKey, fromIndex: number, toIndex: number) => void;
  resetLayout: () => void;
  resetAllLayout: () => void;
  getLayout: () => LayoutData;
  setLayout: (newLayout: LayoutData) => void;
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
      let clamped: string;

      if (height === "auto") {
        clamped = "auto";
      } else {
        const numeric = typeof height === "string" ? parseInt(height, 10) : height;
        const min = MIN_HEIGHTS[section];
        const max = MAX_HEIGHTS[section];
        const bounded = Math.max(min, Math.min(max, numeric));
        clamped = `${bounded}px`;
      }

      const updated = {
        ...get().layout,
        [section]: {
          ...get().layout[section],
          height: clamped,
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

    setLayout: (newLayout) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newLayout));
      set({ layout: newLayout });
    },

    resetLayout: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      set({ layout: initialLayoutConfig });
    },

    resetAllLayout: () => {
      const layout = get().layout;

      const updated: LayoutData = { ...layout };

      (["header", "main", "footer"] as LayoutZoneKey[]).forEach((zone) => {
        updated[zone] = {
          ...updated[zone],
          height: `${DEFAULT_HEIGHTS[zone]}px`,
          visible: true,
        };
      });

      persist(updated);
    },

    getLayout: () => get().layout,
  };
});

export type { LayoutData };
