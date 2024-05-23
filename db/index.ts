import { sql } from "@vercel/postgres";
import { drizzle as drizzlepg } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/vercel-postgres";
import postgres from "postgres";

type PostgresDB = ReturnType<typeof postgres> | undefined;

export const postgresDb: PostgresDB =
  process.env.VERCEL_ENV === "development"
    ? postgres(process.env.POSTGRES_URL ?? "")
    : undefined;

export const db =
  process.env.VERCEL_ENV === "development"
    ? drizzlepg(postgresDb!)
    : drizzle(sql);
