import { sql } from "@vercel/postgres";
import { drizzle as drizzlepg } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/vercel-postgres";
import postgres from "postgres";

type PostgresDB = ReturnType<typeof postgres> | undefined;
let postgresDb: PostgresDB = undefined;

if (!postgresDb && process.env.VERCEL_ENV === "development") {
  postgresDb = postgres(process.env.POSTGRES_URL ?? "");
}

export const db =
  process.env.VERCEL_ENV === "development"
    ? drizzlepg(postgresDb!)
    : drizzle(sql);
