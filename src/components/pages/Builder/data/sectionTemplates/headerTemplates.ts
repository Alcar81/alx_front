// 📁 Builder/components/pages/Builder/data/sectionTemplates/headerTemplates.ts

export const headerTemplates = [
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
