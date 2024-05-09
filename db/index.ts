import { sql } from "@vercel/postgres";
import { drizzle as drizzlepg } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/vercel-postgres";
import postgres from "postgres";

export const db =
  process.env.VERCEL_ENV === "development"
    ? drizzlepg(postgres(process.env.POSTGRES_URL ?? ""))
    : drizzle(sql);
