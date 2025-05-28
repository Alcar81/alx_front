// 📁 src/store/layoutLibraryStore.ts
import { create } from "zustand";
import { LayoutData } from "./layoutStore";

export interface LayoutItem {
  name: string;
  data: LayoutData;
}

interface LayoutLibraryStore {
  layouts: LayoutItem[];
  selectedLayout: string;
  saveLayout: (name: string, data: LayoutData) => void;
  deleteLayout: (name: string) => void;
  selectLayout: (name: string) => void;
  resetLayouts: () => void;
  loadFromStorage: () => void;
}

// 🧠 Clé de stockage
const STORAGE_KEY = "alx_layout_library";
const DEFAULT_LAYOUT_NAME = "default_layout.lay";

// 📦 Chargement initial depuis localStorage
const loadInitialLayouts = (): LayoutItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn("Erreur lors du chargement des layouts", err);
  }
  return [];
};

// 💾 Sauvegarde dans localStorage
const saveToStorage = (layouts: LayoutItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(layouts));
};

// 🏗️ Zustand
export const useLayoutLibraryStore = create<LayoutLibraryStore>((set, get) => ({
  layouts: loadInitialLayouts(),
  selectedLayout: DEFAULT_LAYOUT_NAME,

  saveLayout: (name, data) => {
    const existing = get().layouts.find((l) => l.name === name);

    const updatedLayouts = existing
      ? get().layouts.map((l) => (l.name === name ? { name, data } : l))
      : [...get().layouts, { name, data }];

    saveToStorage(updatedLayouts);
    set({ layouts: updatedLayouts, selectedLayout: name });
  },

  deleteLayout: (name) => {
    if (name === DEFAULT_LAYOUT_NAME) return;

    const updatedLayouts = get().layouts.filter((l) => l.name !== name);
    saveToStorage(updatedLayouts);
    set((state) => ({
      layouts: updatedLayouts,
      selectedLayout: state.selectedLayout === name ? DEFAULT_LAYOUT_NAME : state.selectedLayout,
    }));
  },

  selectLayout: (name) => {
    set({ selectedLayout: name });
  },

  resetLayouts: () => {
    saveToStorage([]);
    set({ layouts: [], selectedLayout: DEFAULT_LAYOUT_NAME });
  },

  loadFromStorage: () => {
    const layouts = loadInitialLayouts();
    set({ layouts });
  },
}));
