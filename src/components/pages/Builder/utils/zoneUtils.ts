// 📁 Builder/utils/zoneUtils.ts

import type { LayoutZoneKey, ResizableZoneType } from "../types/zoneTypes";

/**
 * Détermine si une zone est redimensionnable (header ou footer).
 */
export function isResizableZone(zone: LayoutZoneKey): zone is ResizableZoneType {
  return zone === "header" || zone === "footer";
}
