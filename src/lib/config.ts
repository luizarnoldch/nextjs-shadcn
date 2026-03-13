import z from "zod";

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string(),
  DIRECT_URL: z.string().optional(),

  // App
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXT_PUBLIC_APP_URL: z.string().optional().default("http://localhost:3000"),

  // Storage (Minio/S3/AWS) - make them optional group or individual
  MINIO_PORT: z.string().optional(),
  MINIO_CONSOLE_PORT: z.string().optional(),
  MINIO_ROOT_USER: z.string(),
  MINIO_ROOT_PASSWORD: z.string(),
  MINIO_SERVER_URL: z.string().optional(),
  MINIO_USE_SSL: z.string().optional(),
  MINIO_BROWSER_REDIRECT_URL: z.string().optional(),
  MINIO_REGION: z.string(),
  MINIO_BUCKET_NAME: z.string(),
});

// Parse and validate
const parsedEnv = envSchema.parse(process.env);

// Config object
const config = {
  databaseUrl: parsedEnv.DATABASE_URL,
  nodeEnv: parsedEnv.NODE_ENV,

  nextPublicAppUrl: parsedEnv.NEXT_PUBLIC_APP_URL,

  // Storage config grouped
  minio: {
    port: Number(parsedEnv.MINIO_PORT) || undefined,
    consolePort: Number(parsedEnv.MINIO_CONSOLE_PORT) || 9001,
    rootUser: parsedEnv.MINIO_ROOT_USER,
    rootPassword: parsedEnv.MINIO_ROOT_PASSWORD,
    serverUrl: parsedEnv.MINIO_SERVER_URL || "localhost",
    useSsl: parsedEnv.MINIO_USE_SSL === "true",
    browserRedirectUrl: parsedEnv.MINIO_BROWSER_REDIRECT_URL,
    region: parsedEnv.MINIO_REGION || "us-east-1",
    bucketName: parsedEnv.MINIO_BUCKET_NAME,
  },
};

export default config;
