// 📁 src/__tests__/testConfigReal.ts

import config from "../config/config";
import { configSchema } from "../config/configSchema";

describe("Validation de la configuration réelle", () => {
  it("devrait valider correctement le fichier config.ts", () => {
    const parsed = configSchema.safeParse(config);

    if (!parsed.success) {
      console.error("❌ config.ts invalide :", JSON.stringify(parsed.error.format(), null, 2));
    }

    expect(parsed.success).toBe(true);
  });
});
