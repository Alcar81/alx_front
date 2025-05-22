// 📁 src/config/configSchema.ts
import { z } from "zod";

export const configSchema = z.object({
  API_URL: z.string().url(),
  FRONTEND_URL: z.string().url(),
  WEBSITE_NAME: z.string().min(1),
  MAINTENANCE_MODE: z.boolean(),
  ENABLE_DEBUG: z.boolean(),
});

export type AppConfig = z.infer<typeof configSchema>;
