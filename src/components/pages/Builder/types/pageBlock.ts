// 📁 Builder/types/pageBlock.ts

import { BlockType, BlockPosition } from "./blockTypes";
import { BlockStyle } from "./blockStyles";

export interface PageBlock {
  id: string;
  type: BlockType;
  zone: BlockPosition;
  content?: string;
  src?: string;
  style?: BlockStyle;
  order: number;
}
