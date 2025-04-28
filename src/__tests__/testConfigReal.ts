// src/__tests__/testConfigReal.ts

import "dotenv/config"; // 👈 Force dotenv au début
import { configSchema } from "@/config/configSchema";
import config from "@/config/config";

const result = configSchema.safeParse(config);

if (result.success) {
  console.log("✅ config.ts est valide !");
} else {
  console.error("❌ config.ts invalide :", JSON.stringify(result.error.format(), null, 2));
  process.exit(1); // Ici c'est normal qu'on stoppe si la vraie config est invalide
}