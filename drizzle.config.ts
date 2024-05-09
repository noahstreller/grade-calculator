import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({ path: ".env.development.local" });

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: process.env.POSTGRES_HOST!,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE!,
    ssl: process.env.VERCEL_ENV === "development" ? false : true,
  },
} satisfies Config;
