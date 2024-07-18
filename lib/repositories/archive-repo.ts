"use server";

import { db } from "@/db";
import { archivedata } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getAllArchivedataFromDb(userId: string) {
  const result = await db
    .select()
    .from(archivedata)
    .where(eq(archivedata.userId, userId))
    .execute();
  return result;
}

export async function getArchivedataByIdFromDb(id: number, userId: string) {
  const result = await db
    .select()
    .from(archivedata)
    .where(and(eq(archivedata.userId, userId), eq(archivedata.id, id)))
    .execute();
  return result[0];
}

export async function insertArchivedataIntoDb(
  data: string,
  category: string,
  userId: string
) {
  const result = await db
    .insert(archivedata)
    .values({ data, category, userId })
    .returning()
    .execute();
  return result[0];
}

export async function deleteArchivedataFromDb(id: number, userId: string) {
  const result = await db
    .delete(archivedata)
    .where(and(eq(archivedata.userId, userId), eq(archivedata.id, id)))
    .returning()
    .execute();
  return result[0];
}
