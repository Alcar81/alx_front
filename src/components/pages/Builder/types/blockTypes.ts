// 📁 Builder/types/blockTypes.ts

import type { LayoutZoneKey } from "./zoneTypes";
import { BlockStyle } from "./blockStyles";

// 🧱 Types de blocs utilisables dans le builder
export const VALID_BLOCK_TYPES = [
  "VisualTextBlock",
  "VisualImageBlock",
  "DraggableBlock",
  "LogoHeaderBlock",
  "MenuLeftBlock",
  "MenuRightBlock",
  "UserActionsBlock",
  "PageTitleBlock",
  "MainBlock",
  "SidebarBlock",
  "GroupBlock",
] as const;

export type BlockType = (typeof VALID_BLOCK_TYPES)[number];

// 🧭 Zone logique où peut se trouver un bloc
export type BlockPosition = LayoutZoneKey;

// 🧩 Définition complète d’un bloc instancié dans une page
export interface PageBlock {
  id: string;
  type: BlockType;
  zone: BlockPosition;
  content?: string;
  src?: string;
  style?: BlockStyle;
  order: number;
  label?: string;
  group?: string; // Permet de regrouper les blocs dans l'arborescence
  childrenIds?: string[]; // ✅ Liste d'enfants si c'est un GroupBlock
}

// 🔧 Variante simplifiée utilisée pour previews ou templates
export interface BlockItem {
  id: string;
  component: BlockType;
  position: BlockPosition;
  props?: Record<string, any>;
}
