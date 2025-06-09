// 📁 Builder/config/blockConfig.tsx

import TextFieldsIcon from "@mui/icons-material/TextFields";
import ImageIcon from "@mui/icons-material/Image";
import type { BlockType } from "../types/blockTypes";

// ✅ Typage des blocs du catalogue (utilisé pour validation + menu)
export interface BlockDefinition {
  id: BlockType;
  label: string;
  icon: JSX.Element;
  type: "text" | "image"; // peut être élargi selon tes besoins
  defaultWidth?: number;
  defaultHeight?: number;
}

// ✅ Liste des blocs disponibles
export const blockConfig: BlockDefinition[] = [
  {
    id: "VisualTextBlock",
    label: "Texte",
    icon: <TextFieldsIcon />,
    type: "text",
    defaultWidth: 160,
    defaultHeight: 50,
  },
  {
    id: "VisualImageBlock",
    label: "Image",
    icon: <ImageIcon />,
    type: "image",
    defaultWidth: 180,
    defaultHeight: 100,
  },
  {
    id: "LogoHeaderBlock",
    label: "Logo",
    icon: <ImageIcon />,
    type: "image",
    defaultWidth: 120,
    defaultHeight: 40,
  },
  {
    id: "MenuLeftBlock",
    label: "Menu gauche",
    icon: <TextFieldsIcon />,
    type: "text",
    defaultWidth: 140,
    defaultHeight: 30,
  },
  {
    id: "UserActionsBlock",
    label: "Actions utilisateur",
    icon: <ImageIcon />,
    type: "image",
    defaultWidth: 120,
    defaultHeight: 40,
  },
  {
    id: "PageTitleBlock",
    label: "Titre de page",
    icon: <TextFieldsIcon />,
    type: "text",
    defaultWidth: 180,
    defaultHeight: 40,
  },
  {
    id: "MainBlock",
    label: "Contenu principal",
    icon: <TextFieldsIcon />,
    type: "text",
    defaultWidth: 300,
    defaultHeight: 120,
  },
  {
    id: "SidebarBlock",
    label: "Barre latérale",
    icon: <ImageIcon />,
    type: "image",
    defaultWidth: 150,
    defaultHeight: 120,
  },
];
