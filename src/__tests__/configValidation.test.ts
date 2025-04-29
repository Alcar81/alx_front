// src/__tests__/configValidation.test.ts

import getConfig from "@/config/config";
import { configSchema } from "@/config/configSchema";

describe("Validation du fichier réel config.ts", () => {
  it("doit être valide selon le schéma configSchema", () => {
    const config = getConfig(); // 🔥 Appelle la fonction ici
    const parsed = configSchema.safeParse(config);

    if (!parsed.success) {
      console.error(
        "❌ Erreurs de validation dans src/config/config.ts :",
        JSON.stringify(parsed.error.format(), null, 2)
      );
    }

    expect(parsed.success).toBe(true);
  });
});
