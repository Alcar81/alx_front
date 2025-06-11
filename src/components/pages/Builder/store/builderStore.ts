// 📁 src/store/builderStore.ts

import { createWithEqualityFn } from "zustand/traditional";
import type { ZoneKey } from "../types/zoneTypes";

export interface ZoneData {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BuilderState {
  selectedZone: ZoneKey | null;
  hoveredZone: ZoneKey | null;
  panelPosition: { x: number; y: number };
  zones: Record<ZoneKey, ZoneData>;
  surfaceOffset: { x: number; y: number };
  surfaceSize: { width: number; height: number };
  setSurfaceOffset: (offset: { x: number; y: number }) => void;
  setSelectedZone: (zone: ZoneKey | null) => void;
  setHoveredZone: (zone: ZoneKey | null) => void;
  setPanelPosition: (pos: { x: number; y: number }) => void;
  updateZone: (zone: ZoneKey, data: Partial<ZoneData>) => void;
  resetLayout: () => void;
  setSurfaceSize: (size: { width: number; height: number }) => void;
}

export const useBuilderStore = createWithEqualityFn<BuilderState>((set, get) => ({
  selectedZone: "main",
  hoveredZone: null,
  panelPosition: { x: 100, y: 100 },
  surfaceOffset: { x: 0, y: 0 },
  surfaceSize: { width: 1600, height: 1000 }, // Ajouté

  zones: {
    header: { x: 0, y: 0, width: 1200, height: 80 },
    main: { x: 0, y: 80, width: 1200, height: 600 },
    footer: { x: 0, y: 680, width: 1200, height: 60 },
  },

  setSurfaceOffset: (offset) => set({ surfaceOffset: offset }),
  setSurfaceSize: (size) => set({ surfaceSize: size }),

  setSelectedZone: (zone) => set({ selectedZone: zone }),
  setHoveredZone: (zone) => set({ hoveredZone: zone }),
  setPanelPosition: (pos) => set({ panelPosition: pos }),

  updateZone: (zone, data) =>
    set((state) => {
      const current = state.zones[zone];
      return {
        zones: {
          ...state.zones,
          [zone]: {
            ...current,
            x: Math.max(0, data.x ?? current.x),
            y: Math.max(0, data.y ?? current.y),
            width: Math.max(100, data.width ?? current.width),
            height: Math.max(40, data.height ?? current.height),
          },
        },
      };
    }),

  resetLayout: () => {
    const { x: ox, y: oy } = get().surfaceOffset;
    const width = 1200;
    set(() => ({
      zones: {
        header: { x: ox, y: oy, width, height: 80 },
        main: { x: ox, y: oy + 80, width, height: 600 },
        footer: { x: ox, y: oy + 680, width, height: 60 },
      },
    }));
  },
}));
