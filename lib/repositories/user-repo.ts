"use server";

import { db } from "@/db";
import {
  Account,
  Grade,
  Subject,
  User,
  accounts,
  grades,
  subjects,
  users,
} from "@/db/schema";
import { Empty } from "@/types/types";
import { and, eq } from "drizzle-orm";

export async function deleteUserDataFromDb(userId: string): Promise<User> {
  const result = await db
    .delete(users)
    .where(eq(users.id, userId))
    .returning()
    .execute();
  return result[0];
}

export async function clearUserSubjectsGradesFromDb(
  userId: string
): Promise<Subject[]> {
  const result = await db
    .delete(subjects)
    .where(eq(subjects.userId, userId))
    .returning()
    .execute();
  return result;
}

export async function clearUserSubjectsGradesByCategoryFromDb(
  userId: string,
  categoryId: number
): Promise<Subject[]> {
  const result = await db
    .delete(subjects)
    .where(
      and(eq(subjects.userId, userId), eq(subjects.category_fk, categoryId))
    )
    .returning()
    .execute();
  return result;
}

export async function clearUserGradesFromDb(userId: string): Promise<Grade[]> {
  const result = await db
    .delete(grades)
    .where(eq(grades.userId, userId))
    .returning()
    .execute();
  return result;
}

export async function clearUserGradesByCategoryFromDb(
  userId: string,
  categoryId: number
): Promise<Grade[]> {
  const result = await db
    .delete(grades)
    .where(and(eq(grades.userId, userId), eq(grades.category_fk, categoryId)))
    .returning()
    .execute();
  return result;
}

export async function saveRefreshTokenIntoDb(
  userId: string,
  refreshToken: string
): Promise<Account> {
  const result = await db
    .update(accounts)
    .set({ refresh_token: refreshToken })
    .where(eq(accounts.userId, userId))
    .returning()
    .execute();
  return result[0];
}

export async function getRefreshTokenFromDb(
  userId: string
): Promise<string | Empty> {
  const result = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, userId))
    .execute();
  return result[0].refresh_token;
}
