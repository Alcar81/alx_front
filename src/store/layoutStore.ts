// 📁 src/store/layoutStore.ts
import { create } from "zustand";

interface LayoutStore {
  layout: {
    header: { visible: boolean; height: string };
    footer: { visible: boolean; height: string };
  };
  toggleSection: (section: "header" | "footer") => void;
  setHeight: (section: "header" | "footer", height: string) => void;
}

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
    set((state) => ({
      layout: {
        ...state.layout,
        [section]: {
          ...state.layout[section],
          height,
        },
      },
    })),
}));
