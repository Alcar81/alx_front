// 📁 Builder/types/propTypes.ts

import { PageBlock } from "./pageBlock";
import { BlockStyle } from "./blockStyles";

export interface VisualTextBlockProps {
  block: PageBlock;
  onDelete: (id: string) => void;
  onUpdateStyle: (id: string, newStyle: Partial<BlockStyle>) => void;
}
