// 📁 Builder/types/GhostBlockTypes.ts

import type { BlockType, ZoneKey } from "../store/pageBuilderStore";

export interface GhostBlock {
  type: BlockType;
  zone: ZoneKey;
  position: {
    x: number;
    y: number;
  };
  size?: {
    width: number;
    height: number;
  };
  status?: "valid" | "invalid" | "default";
  label?: string;
}
