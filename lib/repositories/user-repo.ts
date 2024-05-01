"use server"

import { db } from "@/db";
import { Subject, User, subjects, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteUserDataFromDb(userId: string): Promise<User> {
  const result = await db
    .delete(users)
    .where(eq(users.id, userId))
    .returning()
    .execute();
  return result[0];
}

export async function clearUserSubjectsGradesFromDb(userId: string): Promise<Subject[]> {
  const result = await db
    .delete(subjects)
    .where(eq(subjects.userId, userId))
    .returning()
    .execute();
  return result;
}