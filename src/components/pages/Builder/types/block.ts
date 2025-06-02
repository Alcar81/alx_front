// 📁 Builder/types/block.ts

export type BlockPosition = "header" | "main" | "footer";

export interface BlockItem {
  id: string; // ex: "block-123"
  component: string; // ex: "LogoHeaderBlock"
  position: BlockPosition; // ex: "header"
  props?: Record<string, any>; // ex: { text: "Bienvenue", size: "large" }
}
