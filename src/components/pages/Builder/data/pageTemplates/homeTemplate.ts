// 📁 src/data/pageTemplates/homeTemplate.ts
const homeTemplate = {
  layout: "grid", // ou "flexible", "stack", etc. plus tard
  blocks: [
    { id: "logo", component: "LogoHeaderBlock", position: "header" },
    { id: "title", component: "PageTitleBlock", position: "header" },
    { id: "userActions", component: "UserActionsBlock", position: "header" },
    { id: "footer", component: "FooterBlock", position: "footer" },
  ],
};

export default homeTemplate;
