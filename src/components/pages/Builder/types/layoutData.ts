// 📁 Builder/types/layoutData.ts

import type { BlockItem } from "./block";

export interface LayoutSection {
  height: string;
  visible: boolean;
  fixed?: boolean;
  areas?: string[];
  blocks?: BlockItem[];
}

export interface LayoutData {
  header: LayoutSection;
  footer: LayoutSection;
  main: LayoutSection;
}
