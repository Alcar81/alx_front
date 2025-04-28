// 📁 src/hooks/useMaintenance.ts

import { useMemo } from "react";

/**
 * Hook qui gère le mode maintenance.
 */
export const useMaintenance = () => {
  const isMaintenanceActive = useMemo(() => {
    return false; 
    // 🔥 À passer à true pour activer temporairement
  }, []);

  return { isMaintenanceActive };
};
