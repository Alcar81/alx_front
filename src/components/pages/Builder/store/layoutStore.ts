// 📁 src/store/layoutStore.ts

import { create } from "zustand";
import initialLayoutConfig from "../config/initialFullLayoutConfig";
import type { LayoutData } from "../types/layoutData";

// 🔑 Zones pouvant être ajustées par l'utilisateur
export type LayoutZoneKey = "header" | "main" | "footer";

// 🔒 Contraintes de hauteur
export const MIN_HEIGHTS: Record<LayoutZoneKey, number> = {
  header: 40,
  main: 0, // ← aucune contrainte
  footer: 40,
};

export const MAX_HEIGHTS: Record<LayoutZoneKey, number> = {
  header: 200,
  main: 10000, // ← très large pour éviter d’interdire quoi que ce soit
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
  resetAllLayout: () => void; // ✅ ajout de la méthode complète
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

    setHeight: (section: LayoutZoneKey, height) => {
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

    toggleSection: (section: LayoutZoneKey) => {
      const layout = get().layout;
      const updated: LayoutData = {
        ...layout,
        [section]: {
          ...layout[section],
          visible: !layout[section].visible,
        },
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      set({ layout: updated });
    },

    resetLayout: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      set({ layout: initialLayoutConfig });
    },

    resetAllLayout: () => {
      const layout = get().layout;
      const updated: LayoutData = { ...layout };

      const defaultHeights: Record<LayoutZoneKey, number> = {
        header: 80,
        footer: 60,
        main: 400, // valeur de base par défaut
      };

      (["header", "main", "footer"] as LayoutZoneKey[]).forEach((zone) => {
        updated[zone] = {
          ...updated[zone],
          height: `${defaultHeights[zone]}px`,
          visible: true,
        };
      });

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      set({ layout: updated });
    },

    getLayout: () => get().layout,
  };
});

export type { LayoutData };
