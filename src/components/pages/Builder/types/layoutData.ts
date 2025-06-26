// 📁 Builder/types/layoutData.ts

import type { BlockItem } from "./blockTypes";
import type { FooterMode } from "./zoneTypes";

export interface LayoutSection {
  height: string;
  visible: boolean;
  fixed?: boolean;
  areas?: string[];
  blocks?: BlockItem[];
}

export interface LayoutData {
  header: LayoutSection;
  main: LayoutSection;
  footer: LayoutSection;
  footerMode: FooterMode;
}
