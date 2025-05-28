// 📁 src/store/resizeGuideStore.ts
import { create } from "zustand";

interface ResizeGuideState {
  active: boolean;
  y: number;
  zone: "header" | "footer" | null;
  start: (zone: "header" | "footer", y: number) => void;
  move: (y: number) => void;
  stop: () => void;
}

export const useResizeGuideStore = create<ResizeGuideState>((set) => ({
  active: false,
  y: 0,
  zone: null,
  start: (zone, y) => set({ active: true, y, zone }),
  move: (y) => set({ y }),
  stop: () => set({ active: false, zone: null }),
}));
