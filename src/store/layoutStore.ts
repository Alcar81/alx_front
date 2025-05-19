// 📁 src/store/layoutStore.ts
import { create } from "zustand";

// 🔑 Types explicites pour les zones ajustables
export type LayoutZoneKey = "header" | "footer";

// 🔒 Contraintes de hauteur (min / max)
export const MIN_HEIGHTS: Record<LayoutZoneKey, number> = {
  header: 40,
  footer: 40,
};

export const MAX_HEIGHTS: Record<LayoutZoneKey, number> = {
  header: 200,
  footer: 300,
};

export interface LayoutData {
  header: { visible: boolean; height: string };
  footer: { visible: boolean; height: string };
}

// 🧠 Interface du store
interface LayoutStore {
  layout: {
    header: { visible: boolean; height: string };
    footer: { visible: boolean; height: string };
  };
  toggleSection: (section: LayoutZoneKey) => void;
  setHeight: (section: LayoutZoneKey, height: string | number) => void;
}

// 🏗️ Zustand store
export const useLayoutStore = create<LayoutStore>((set) => ({
  layout: {
    header: { visible: true, height: "80px" },
    footer: { visible: true, height: "60px" },
  },

  toggleSection: (section) =>
    set((state) => ({
      layout: {
        ...state.layout,
        [section]: {
          ...state.layout[section],
          visible: !state.layout[section].visible,
        },
      },
    })),

  setHeight: (section, height) =>
    set((state) => {
      const numeric = typeof height === "string" ? parseInt(height, 10) : height;
      const clamped = Math.max(MIN_HEIGHTS[section], Math.min(MAX_HEIGHTS[section], numeric));

      return {
        layout: {
          ...state.layout,
          [section]: {
            ...state.layout[section],
            height: `${clamped}px`,
          },
        },
      };
    }),
}));
