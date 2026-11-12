import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  APP_ID: z.string().min(1, "APP_ID is required"),
  APP_SECRET: z.string().min(1, "APP_SECRET is required"),
  OWNER_UNION_ID: z.string().optional(),
  KIMI_AUTH_URL: z.string().url().default("https://auth.kimi.com"),
  KIMI_OPEN_URL: z.string().url().default("https://open.kimi.com"),
  OPENAI_API_KEY: z.string().optional(),
  PORT: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = {
  ...parsed.data,
  get appId() { return parsed.data.APP_ID; },
  get appSecret() { return parsed.data.APP_SECRET; },
  get kimiAuthUrl() { return parsed.data.KIMI_AUTH_URL; },
  get kimiOpenUrl() { return parsed.data.KIMI_OPEN_URL; },
  get databaseUrl() { return parsed.data.DATABASE_URL; },
  get ownerUnionId() { return parsed.data.OWNER_UNION_ID; },
  get openaiApiKey() { return parsed.data.OPENAI_API_KEY; },
  get port() { return parsed.data.PORT; },
  get isProduction() {
    return parsed.data.NODE_ENV === "production";
  },
  get isDevelopment() {
    return parsed.data.NODE_ENV === "development";
  },
};
