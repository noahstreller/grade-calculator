"use server";

import { db } from "@/db";
import { Category, categories } from "@/db/schema";
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

export async function insertCategoryIntoDb(
  name: string,
  selected: boolean,
  userId: string
) {
  const result = await db
    .insert(categories)
    .values({ name, userId, selected })
    .returning()
    .execute();
  return result[0];
}

export async function updateCategoryInDb(category: Category, userId: string) {
  const result = await db
    .update(categories)
    .set(category)
    .where(and(eq(categories.userId, userId), eq(categories.id, category.id)))
    .returning()
    .execute();
  return result[0];
}

export async function deleteCategoryFromDb(id: number, userId: string) {
  const result = await db
    .delete(categories)
    .where(
      and(
        eq(categories.userId, userId),
        eq(categories.id, id),
        eq(categories.selected, false)
      )
    )
    .returning()
    .execute();
  return result[0];
}

export async function changeSelectedCategoryInDb(id: number, userId: string) {
  try {
    await db.transaction(async (db) => {
      await db
        .update(categories)
        .set({ selected: false })
        .where(eq(categories.userId, userId))
        .execute();
      const result = await db
        .update(categories)
        .set({ selected: true })
        .where(and(eq(categories.id, id), eq(categories.userId, userId)))
        .execute();
      return result;
    });
    return true;
  } catch (e: any) {
    return false;
  }
}
