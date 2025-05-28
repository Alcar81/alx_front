// 📁 src/utils/generateLayoutCSSVars.ts
import type React from "react";
import { useLayoutStore } from "../store/layoutStore";

export function generateLayoutCSSVars(): React.CSSProperties {
  const layout = useLayoutStore.getState().layout;

  return {
    "--header-height": layout.header.visible ? layout.header.height : "0px",
    "--footer-height": layout.footer.visible ? layout.footer.height : "0px",
  } as React.CSSProperties;
}
