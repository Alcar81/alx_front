import { create } from "zustand";

export type ZoneKey = "header" | "main" | "footer" | "sidebar-left" | "sidebar-right";

export interface ZoneData {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface BuilderState {
  selectedZone: ZoneKey | null;
  hoveredZone: ZoneKey | null;
  panelPosition: { x: number; y: number };
  zones: Record<ZoneKey, ZoneData>;
  surfaceOffset: { x: number; y: number }; // 🆕
  setSurfaceOffset: (offset: { x: number; y: number }) => void; // 🆕
  setSelectedZone: (zone: ZoneKey | null) => void;
  setHoveredZone: (zone: ZoneKey | null) => void;
  setPanelPosition: (pos: { x: number; y: number }) => void;
  updateZone: (zone: ZoneKey, data: Partial<ZoneData>) => void;
  resetLayout: () => void;
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  selectedZone: "main",
  hoveredZone: null,
  panelPosition: { x: 100, y: 100 },
  surfaceOffset: { x: 0, y: 0 }, // 👈 par défaut

  zones: {
    "sidebar-left": { x: 0, y: 80, width: 220, height: 600 },
    header: { x: 220, y: 0, width: 1040, height: 80 },
    main: { x: 220, y: 80, width: 1040, height: 500 },
    footer: { x: 220, y: 580, width: 1040, height: 60 },
    "sidebar-right": { x: 1260, y: 80, width: 240, height: 600 },
  },

  setSurfaceOffset: (offset) => set({ surfaceOffset: offset }),

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
    const left = 220;
    const main = 1040;
    const right = 240;
    set(() => ({
      zones: {
        "sidebar-left": { x: ox, y: oy + 80, width: left, height: 600 },
        header: { x: ox + left, y: oy, width: main, height: 80 },
        main: { x: ox + left, y: oy + 80, width: main, height: 500 },
        footer: { x: ox + left, y: oy + 580, width: main, height: 60 },
        "sidebar-right": { x: ox + left + main, y: oy + 80, width: right, height: 600 },
      },
    }));
  },
}));
