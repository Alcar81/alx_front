// 📁 Builder/data/sectionTemplates/footerTemplates.ts
import type { SectionTemplate } from "../../types/sectionTemplate";

export const footerTemplates: SectionTemplate[] = [
  {
    id: "footerSimple",
    label: "Footer simple avec texte",
    blocks: [{ id: "footerText", component: "VisualTextBlock" }],
  },
];
