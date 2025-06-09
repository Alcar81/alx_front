// 📁 Builder/data/sectionTemplates/mainTemplates.ts
import type { SectionTemplate } from "../../types/sectionTemplate";

export const mainTemplates: SectionTemplate[] = [
  {
    id: "mainBasic",
    label: "Contenu texte simple",
    blocks: [{ id: "mainText", component: "MainBlock" }],
  },
  {
    id: "mainWithSidebar",
    label: "Contenu + Sidebar",
    blocks: [
      { id: "mainContent", component: "MainBlock" },
      { id: "sidebar", component: "SidebarBlock" },
    ],
  },
];
