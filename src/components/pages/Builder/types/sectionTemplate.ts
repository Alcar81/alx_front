// 📁 Builder/types/sectionTemplate.ts

import type { BlockType } from "./blockTypes";

// ✅ Type pour un bloc à l'intérieur d'un template de section
export interface SectionBlock {
  id: string;
  component: BlockType;
}

// ✅ Un template complet pour une zone (header, main, footer)
export interface SectionTemplate {
  id: string;
  label: string;
  blocks: SectionBlock[];
}
