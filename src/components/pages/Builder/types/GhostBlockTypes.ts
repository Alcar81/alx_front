// 📁 Builder/types/GhostBlockTypes.ts

import type { BlockType, BlockPosition } from "./blockTypes";

export interface GhostBlock {
  type: BlockType;
  zone: BlockPosition;
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
