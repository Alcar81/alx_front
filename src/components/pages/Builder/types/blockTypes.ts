// 📁 Builder/types/blockTypes.ts

import { BlockStyle } from "./blockStyles";

/**
 * Les identifiants réels utilisés pour instancier un bloc dans la page.
 * Ceux-ci correspondent à des composants React affichables.
 */
export type BlockType = "VisualTextBlock" | "ImageBlock" | "DraggableBlock";

/**
 * Position logique dans la page (zone cible dans le layout).
 */
export type BlockPosition = "header" | "main" | "footer";

/**
 * Décrit un bloc instancié (posé) dans la page.
 */
export interface PageBlock {
  id: string; // identifiant unique (uuid)
  type: BlockType; // type réel du composant
  zone: BlockPosition; // zone dans laquelle le bloc est placé
  content?: string; // contenu texte éventuel
  src?: string; // image éventuelle
  style?: BlockStyle; // style CSS appliqué
  order: number; // ordre d’affichage dans la zone
}

/**
 * Variante utilisée dans certains cas pour des blocs en cours de configuration.
 */
export interface BlockItem {
  id: string;
  component: BlockType;
  position: BlockPosition;
  props?: Record<string, any>;
}
