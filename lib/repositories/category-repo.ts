"use server";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getAllCategoriesFromDb(userId: string) {
  const result = await db
    .select()
    .from(categories)
    .where(eq(categories.userId, userId))
    .execute();

  return result;
}

export async function getCategoryByIdFromDb(id: number, userId: string) {
  const result = await db
    .select()
    .from(categories)
    .where(and(eq(categories.userId, userId), eq(categories.id, id)))
    .execute();
  return result[0];
}

export async function getCurrentCategoryFromDb(userId: string) {
  const result = await db
    .select()
    .from(categories)
    .where(and(eq(categories.userId, userId), eq(categories.selected, true)))
    .execute();
  return result[0];
}

export async function insertCategoryIntoDb(name: string, userId: string) {
  const result = await db
    .insert(categories)
    .values({ name, userId })
    .returning()
    .execute();
  return result[0];
}
