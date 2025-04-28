// 📁 src/__tests__/testMockConfigs.test.ts

import mockConfigs from "../mocks/mockConfigs";
import { configSchema } from "../config/configSchema";

describe("Mock Configs Structure", () => {
  it("Chaque mockConfig respecte le schéma de configuration", () => {
    Object.entries(mockConfigs).forEach(([key, config]) => {
      const result = configSchema.safeParse(config);

      if (!result.success) {
        console.error(`❌ Erreur de validation pour ${key} :`, result.error.format());
      }

      expect(result.success).toBe(true);
    });
  });
});