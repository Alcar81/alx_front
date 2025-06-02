// 📁 Builder/components/pages/Builder/data/sectionTemplates/footerTemplates.ts

export const footerTemplates = [
  {
    id: "footerSimple",
    label: "Pied de page simple",
    blocks: [{ id: "footer", component: "FooterBlock" }],
  },
  {
    id: "footerWithLinks",
    label: "Liens + copyright",
    blocks: [
      { id: "footerLinks", component: "FooterLinksBlock" },
      { id: "footerCopy", component: "FooterBlock" },
    ],
  },
];
