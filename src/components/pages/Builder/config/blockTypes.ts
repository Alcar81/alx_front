// 📁 src/config/blockTypes.ts

export interface BlockType {
  id: string;
  label: string;
  type: "text" | "image" | "button" | "custom";
  icon: string; // emoji temporaire ou nom d'icône
  defaultWidth?: number;
  defaultHeight?: number;
}

export const blockTypes: BlockType[] = [
  {
    id: "h1",
    label: "Titre H1",
    type: "text",
    icon: "🔠",
    defaultWidth: 200,
    defaultHeight: 60,
  },
  {
    id: "paragraph",
    label: "Paragraphe",
    type: "text",
    icon: "📄",
    defaultWidth: 300,
    defaultHeight: 100,
  },
  {
    id: "image",
    label: "Image",
    type: "image",
    icon: "🖼️",
    defaultWidth: 200,
    defaultHeight: 150,
  },
  {
    id: "button",
    label: "Bouton",
    type: "button",
    icon: "🔘",
    defaultWidth: 120,
    defaultHeight: 50,
  },
];
