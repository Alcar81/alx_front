// 📁 Builder/components/pages/Builder/data/sectionTemplates/mainTemplates.ts

export const mainTemplates = [
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
