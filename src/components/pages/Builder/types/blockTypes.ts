// 📁 Builder/types/blockTypes.ts

import { BlockStyle } from "./blockStyles";

export type BlockType = "VisualTextBlock" | "ImageBlock" | "DraggableBlock";
export type BlockPosition = "header" | "main" | "footer";

export interface BlockItem {
  id: string;
  component: BlockType;
  position: BlockPosition;
  props?: Record<string, any>;
}

export interface PageBlock {
  id: string;
  type: BlockType;
  zone: BlockPosition;
  content?: string;
  src?: string;
  style?: BlockStyle;
  order: number;
}
