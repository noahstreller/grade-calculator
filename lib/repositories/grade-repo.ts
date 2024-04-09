"use server"
import { db } from "@/db";
import { Grade, grades, NewGrade, Subject } from "@/db/schema";
import { catchProblem } from "@/lib/problem";
import { getSubjectByName } from "@/lib/services/subject-service";
import { and, eq } from "drizzle-orm";

export async function getAllGradesFromDb(userId: string): Promise<Grade[]> {
  const result = await db
    .select()
    .from(grades)
    .where(eq(grades.userId, userId))
    .execute();
  return result;
}

export async function getGradesBySubjectFromDb(subject: string | number | Subject, userId: string): Promise<Grade[]> {
  if (typeof subject === "string") {
    const subjectId = catchProblem(await getSubjectByName(subject));
    const result = await db
      .select()
      .from(grades)
      .where(and(eq(grades.subject_fk, subjectId), eq(grades.userId, userId)))
      .execute();
    return result;
  }
  if (typeof subject === "number") {
    const result = await db
      .select()
      .from(grades)
      .where(and(eq(grades.subject_fk, subject), eq(grades.userId, userId)))
      .execute();
    return result;
  }
  const result = await db
    .select()
    .from(grades)
    .where(and(eq(grades.subject_fk, subject.id), eq(grades.userId, userId)))
    .execute();
  return result;
}

export async function addGradeToDb(newGrade: NewGrade): Promise<number> {
  const result = await db
    .insert(grades)
    .values(newGrade)
    .returning({ newId: grades.id })
    .execute();
  return result[0].newId;
}
