// 📁 Builder/config/initialFullLayoutConfig.ts

import type { LayoutData } from "../types/layoutData";

const initialFullLayoutConfig: LayoutData = {
  header: {
    height: "80px",
    visible: true,
  },
  main: {
    height: "400px",
    visible: true,
  },
  footer: {
    height: "60px",
    visible: true,
  },
};

export default initialFullLayoutConfig;
