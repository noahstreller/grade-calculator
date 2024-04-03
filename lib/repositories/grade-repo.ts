"use server"

import { db } from "@/db";
import { Grade, grades, NewGrade } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllGradesFromDb(userId: string): Promise<Grade[]> {
  const result = await db
    .select()
    .from(grades)
    .where(eq(grades.userId, userId))
    .execute();
  return result;
}

export async function addGradeToDb(newGrade: NewGrade) {
  const result = await db
    .insert(grades)
    .values(newGrade)
    .returning({ newId: grades.id })
    .execute();
  return result[0].newId;
}
