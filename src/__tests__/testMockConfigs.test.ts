// 📁 src/__tests__/testMockConfigs.test.ts

import mockConfigs from "@/mocks/mockConfigs";
import { configSchema } from "../config/configSchema";

describe("Mock Configs Structure", () => {
  it("Chaque mockConfig valide respecte le schéma de configuration", () => {
    const entries = Object.entries(mockConfigs);

    entries.forEach(([key, config]) => {
      // ⛔ Ignorer volontairement "missingApiUrl"
      if (key === "missingApiUrl") {
        console.warn(`⚠️ ${key} ignoré pour validation volontaire.`);
        return;
      }

      const result = configSchema.safeParse(config);

      if (!result.success) {
        console.error(`❌ Erreur de validation pour ${key} :`, result.error.format());
      }

      expect(result.success).toBe(true);
    });
  });
});
