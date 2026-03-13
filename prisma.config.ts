import { config as dotenvConfig } from "dotenv";
import path from "node:path";
import { defineConfig, env } from "prisma/config";

const nodeEnv = process.env.NODE_ENV || "development";

// Logic matching Next.js environment variable priority
if (nodeEnv === "production") {
  dotenvConfig({ path: path.resolve(process.cwd(), ".env.production") });
  dotenvConfig({ path: path.resolve(process.cwd(), ".env") });
} else {
  dotenvConfig({ path: path.resolve(process.cwd(), ".env.development") });
  dotenvConfig({ path: path.resolve(process.cwd(), ".env.local") });
}

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    path: path.join("prisma", "migrations"),
    seed: `tsx prisma/seed.ts`,
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
