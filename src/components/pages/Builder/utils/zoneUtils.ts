// 📁 Builder/utils/zoneUtils.ts

import type { LayoutZoneKey, ZoneType } from "../types/zoneTypes";

/**
 * Détermine si une zone est redimensionnable (header ou footer).
 */
export function isResizableZone(zone: LayoutZoneKey): zone is ZoneType {
  return zone === "header" || zone === "footer";
}
