// 📁 Builder/config/blockConfig.ts

/**
 * Configuration statique des types de blocs disponibles dans le panneau "Éléments".
 * Ces objets décrivent les blocs qu’on peut ajouter dynamiquement dans l’interface.
 */

export interface BlockConfig {
  id: string;
  label: string;
  type: "text" | "image" | "button" | "custom"; // catégorie
  icon: string; // emoji ou nom d’icône
  defaultWidth?: number;
  defaultHeight?: number;
}

export const blockConfig: BlockConfig[] = [
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
