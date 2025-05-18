// 📁 src/config/layoutConfig.ts

const layoutConfig = {
  sidebarLeft: {
    visible: true,
    width: "220px",
    fixed: true,
  },
  header: {
    visible: true,
    height: "80px",
    fixed: true,
    areas: ["logo", "menuLeft", "menuRight", "userActions"], // 🧩 ordre et présence dynamiques
  },
  main: {
    visible: true,
    padding: "2rem",
  },
  footer: {
    visible: true,
    height: "60px",
    fixed: true,
  },
  sidebarRight: {
    visible: true,
    width: "240px",
    resizable: true,
  },
};

export default layoutConfig;
