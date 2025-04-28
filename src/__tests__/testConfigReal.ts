import { configSchema } from "@/config/configSchema";
import config from "@/config/config";

const result = configSchema.safeParse(config);

if (result.success) {
  console.log("✅ config.ts valide.");
} else {
  console.error("❌ config.ts invalide :", JSON.stringify(result.error.format(), null, 2));
  process.exit(1);
}
