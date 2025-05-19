// 📁 src/store/layoutStore.ts

import { create } from "zustand";
import initialLayoutConfig from "../config/initialFullLayoutConfig";
import type { LayoutData } from "../types/layoutData";

// 🔑 Zones pouvant être ajustées par l'utilisateur
export type LayoutZoneKey = "header" | "footer";

// 🔒 Contraintes de hauteur
export const MIN_HEIGHTS: Record<LayoutZoneKey, number> = {
  header: 40,
  footer: 40,
};

export const MAX_HEIGHTS: Record<LayoutZoneKey, number> = {
  header: 200,
  footer: 300,
};

// 🔐 Clé pour la persistance locale
const LOCAL_STORAGE_KEY = "layout_config_v1";

// 🧠 Interface Zustand
interface LayoutStore {
  layout: LayoutData;
  setHeight: (section: LayoutZoneKey, height: string | number) => void;
  toggleSection: (section: LayoutZoneKey) => void;
  resetLayout: () => void;
  getLayout: () => LayoutData;
}

// 🏗️ Store Zustand avec lecture/sauvegarde localStorage
export const useLayoutStore = create<LayoutStore>((set, get) => {
  let parsed: LayoutData;

  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    parsed = stored ? JSON.parse(stored) : initialLayoutConfig;
  } catch (err) {
    console.warn("❗Erreur de lecture localStorage ➜ fallback à la config initiale.");
    parsed = initialLayoutConfig;
  }

  return {
    layout: parsed,

    setHeight: (section, height) => {
      const numeric = typeof height === "string" ? parseInt(height, 10) : height;
      const clamped = Math.max(MIN_HEIGHTS[section], Math.min(MAX_HEIGHTS[section], numeric));
      const updated: LayoutData = {
        ...get().layout,
        [section]: {
          ...get().layout[section],
          height: `${clamped}px`,
        },
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      set({ layout: updated });
    },

    toggleSection: (section) => {
      const updated: LayoutData = {
        ...get().layout,
        [section]: {
          ...get().layout[section],
          visible: !get().layout[section].visible,
        },
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      set({ layout: updated });
    },

    resetLayout: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      set({ layout: initialLayoutConfig });
    },

    getLayout: () => get().layout,
  };
});

export type { LayoutData };
