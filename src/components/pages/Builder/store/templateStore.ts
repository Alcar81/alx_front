// 📁 Builder/store/templateStore.ts

import { create } from "zustand";
import type { LayoutData } from "../types/layoutData";
import { useLayoutStore } from "./layoutStore";

// 🔖 Structure de données pour un template
export interface TemplateData {
  name: string;
  createdAt: string;
  version: number;
  layout: LayoutData;
}

// 🧠 Interface Zustand
interface TemplateStore {
  templates: TemplateData[];
  selectedTemplate: string;
  setSelectedTemplate: (name: string) => void;
  addTemplate: (name: string) => void;
  removeTemplate: (name: string) => void;
  incrementVersion: (name: string) => void;
  updateTemplateLayout: (name: string, newLayout: LayoutData) => void; // ✅ Ajouté
}

// 🏗️ Store Zustand
export const useTemplateStore = create<TemplateStore>((set, get) => ({
  templates: [
    {
      name: "Portfolio-2024",
      createdAt: "2024-11-10",
      version: 1,
      layout: {
        header: { visible: true, height: "80px" },
        footer: { visible: true, height: "60px" },
        main: { visible: true, height: "400px" },
        footerMode: "fixed",
      },
    },
    // ... autres templates initiaux
  ],
  selectedTemplate: "Portfolio-2024",

  setSelectedTemplate: (name) => {
    const template = get().templates.find((t) => t.name === name);
    if (template) {
      useLayoutStore.setState({ layout: template.layout });
    }
    set({ selectedTemplate: name });
  },

  addTemplate: (name) => {
    const newTemplate = {
      name,
      createdAt: new Date().toISOString().split("T")[0],
      version: 1,
      layout: useLayoutStore.getState().layout,
    };
    set((state) => ({
      templates: [...state.templates, newTemplate],
      selectedTemplate: name,
    }));
  },

  removeTemplate: (name) => {
    set((state) => {
      const newTemplates = state.templates.filter((t) => t.name !== name);
      return {
        templates: newTemplates,
        selectedTemplate:
          state.selectedTemplate === name
            ? newTemplates[0]?.name || "" // Ajoute un fallback explicite
            : state.selectedTemplate,
      };
    });
  },

  incrementVersion: (name) => {
    set((state) => ({
      templates: state.templates.map((t) =>
        t.name === name
          ? { ...t, version: t.version + 1, layout: useLayoutStore.getState().layout }
          : t
      ),
    }));
  },

  updateTemplateLayout: (name, newLayout) => {
    set((state) => ({
      templates: state.templates.map((t) => (t.name === name ? { ...t, layout: newLayout } : t)),
    }));
  },
}));
