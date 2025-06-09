// 📁 Builder/data/sectionTemplates/headerTemplates.ts
import type { SectionTemplate } from "../../types/sectionTemplate";

export const headerTemplates: SectionTemplate[] = [
  {
    id: "headerSplitCenter",
    label: "Logo centré / Menu gauche & droite / Actions",
    blocks: [
      { id: "logo", component: "LogoHeaderBlock" },
      { id: "menuLeft", component: "MenuLeftBlock" },
      { id: "menuRight", component: "MenuRightBlock" },
      { id: "userActions", component: "UserActionsBlock" },
    ],
  },
  {
    id: "headerCenter",
    label: "Tout centré avec titre",
    blocks: [
      { id: "title", component: "PageTitleBlock" },
      { id: "userActions", component: "UserActionsBlock" },
    ],
  },
  {
    id: "headerMinimal",
    label: "Logo seul",
    blocks: [{ id: "logo", component: "LogoHeaderBlock" }],
  },
];
