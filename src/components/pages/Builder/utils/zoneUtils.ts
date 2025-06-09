// 📁 Builder/utils/zoneUtils.ts

import type { ZoneKey, ZoneType } from "../types/zoneTypes";

/**
 * Détermine si une zone est redimensionnable (header ou footer).
 */
export function isResizableZone(zone: ZoneKey): zone is ZoneType {
  return zone === "header" || zone === "footer";
}
