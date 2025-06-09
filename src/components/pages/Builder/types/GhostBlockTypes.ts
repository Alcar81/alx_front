// 📁 Builder/types/GhostBlockTypes.ts

import type { BlockType } from "./blockTypes";
import type { ZoneKey } from "./zoneTypes";

export interface GhostBlock {
  type: BlockType;
  zone: ZoneKey;
  position: { x: number; y: number };
  size?: { width: number; height: number };
  status?: "valid" | "invalid" | "default";
  label?: string;
}
