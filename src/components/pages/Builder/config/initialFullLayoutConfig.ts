// 📁 Builder/config/initialFullLayoutConfig.ts

import type { LayoutData } from "../types/layoutData";
import { DEFAULT_HEIGHTS } from "../constants/defaultHeights";

// ✨ Fonction utilitaire pour convertir number | "auto" en string (ex: 80 → "80px", "auto" → "auto")
const toHeightString = (val: number | "auto"): string =>
  typeof val === "number" ? `${val}px` : val;

const initialFullLayoutConfig: LayoutData = {
  header: { height: toHeightString(DEFAULT_HEIGHTS.header), visible: true },
  main: { height: toHeightString(DEFAULT_HEIGHTS.main), visible: true },
  footer: { height: toHeightString(DEFAULT_HEIGHTS.footer), visible: true },
  footerMode: "fixed",
};

export default initialFullLayoutConfig;
