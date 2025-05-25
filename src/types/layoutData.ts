// 📁 src/types/layoutData.ts

export interface LayoutSection {
  height: string;
  visible: boolean;
  fixed?: boolean;
  areas?: string[];
}

export interface LayoutData {
  header: LayoutSection;
  footer: LayoutSection;
  main: LayoutSection;
}
