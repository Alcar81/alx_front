// 📁 Builder/utils/validateTemplates.ts

import type { SectionTemplate } from "../types/sectionTemplate";
import { VALID_BLOCK_TYPES } from "../types/blockTypes";

/**
 * Vérifie si chaque composant de chaque template correspond à un BlockType connu.
 * @param templates Tableau de templates à valider
 * @param label Nom de la section (ex: "header", "main", "footer") pour identifier les erreurs
 */
export function validateTemplates(templates: SectionTemplate[], label: string): void {
  templates.forEach((template) => {
    template.blocks.forEach((block) => {
      if (!VALID_BLOCK_TYPES.includes(block.component as any)) {
        console.warn(
          `[Template Validation] ❌ "${block.component}" dans le modèle "${template.id}" (${label}) n’est pas un BlockType valide.`
        );
      }
    });
  });
}
