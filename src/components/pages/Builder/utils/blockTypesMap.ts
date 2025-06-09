// 📁 Builder/utils/blockTypeMap.ts

import type { BlockType } from "../types/blockTypes";

export const mapBlockIdToComponent = (id: string): BlockType => {
  switch (id) {
    case "h1":
    case "paragraph":
      return "VisualTextBlock";
    case "image":
      return "VisualImageBlock";
    case "drag":
      return "DraggableBlock";
    default:
      throw new Error(`Bloc inconnu : ${id}`);
  }
};
