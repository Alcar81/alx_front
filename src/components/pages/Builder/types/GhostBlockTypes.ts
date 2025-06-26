// 📁 Builder/types/GhostBlockTypes.ts

import type { BlockType } from "./blockTypes";
import type { LayoutZoneKey } from "./zoneTypes";

export interface GhostBlock {
  type: BlockType;
  zone: LayoutZoneKey;
  position: { x: number; y: number };
  size?: { width: number; height: number };
  status?: "valid" | "invalid" | "default";
  label?: string;
}
