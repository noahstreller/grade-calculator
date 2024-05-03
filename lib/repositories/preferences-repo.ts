"use server";
import { db } from "@/db";
import { NewPreferences, Preferences, preferences } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getPreferencesFromDb(userId: string): Promise<Preferences[]> {
  const result = await db
    .select()
    .from(preferences)
    .where(eq(preferences.userId, userId))
    .execute();
  return result satisfies Preferences[];
}

export async function addPreferencesToDb(
  newPreferences: NewPreferences
): Promise<Preferences> {
  const result = await db
    .insert(preferences)
    .values(newPreferences)
    .returning()
    .execute();
  return result[0] satisfies Preferences;
}

export async function updatePreferencesInDb(
  newPreferences: NewPreferences
): Promise<Preferences> {
  const result = await db
    .update(preferences)
    .set(newPreferences)
    .where(eq(preferences.id, newPreferences.id!))
    .returning()
    .execute();
  return result[0] satisfies Preferences;
}
