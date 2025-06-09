import type { BlockType } from "../types/blockTypes";

/**
 * Permet de convertir un id de bloc ("h1", "image", "paragraph") en type React ("VisualTextBlock", etc.)
 */
export function mapBlockIdToComponent(id: string): BlockType {
  switch (id) {
    case "h1":
    case "paragraph":
      return "VisualTextBlock";
    case "image":
      return "VisualImageBlock";
    case "button":
      return "DraggableBlock";
    default:
      return "VisualTextBlock"; // fallback
  }
}
