// 📁 src/config/configSchema.ts
import { z } from "zod";

export const configSchema = z.object({
  REACT_APP_API_URL: z.string().url(),
  REACT_APP_FRONTEND_URL: z.string().url(),
  REACT_APP_WEBSITE_NAME: z.string().min(1),
  REACT_APP_MAINTENANCE_MODE: z.boolean(),
  REACT_APP_ENABLE_DEBUG: z.boolean(),
});

export type AppConfig = z.infer<typeof configSchema>; // ✅ Ce type doit être bien exporté
