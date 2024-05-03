"use server"
import { db } from "@/db";
import { Grade, grades, GradeWithSubject, NewGrade, Subject, subjects } from "@/db/schema";
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

export async function getAllGradesWithSubjectFromDb(userId: string): Promise<GradeWithSubject[]> {
  const result = await db
    .select()
    .from(grades)
    .innerJoin(subjects, eq(grades.subject_fk, subjects.id))
    .where(eq(grades.userId, userId))
    .execute();
  return result;
}

export async function getGradesBySubjectFromDb(
  subject: string | number | Subject,
  userId: string
): Promise<Grade[]> {
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

export async function getGradesBySubjectWithSubjectFromDb(
  subject: string | number | Subject,
  userId: string
): Promise<GradeWithSubject[]> {
  if (typeof subject === "string") {
    const subjectId = catchProblem(await getSubjectByName(subject));
    const result = await db
      .select()
      .from(grades)
      .innerJoin(subjects, eq(grades.subject_fk, subjects.id))
      .where(and(eq(grades.subject_fk, subjectId), eq(grades.userId, userId)))
      .execute();
    return result;
  }
  if (typeof subject === "number") {
    const result = await db
      .select()
      .from(grades)
      .innerJoin(subjects, eq(grades.subject_fk, subjects.id))
      .where(and(eq(grades.subject_fk, subject), eq(grades.userId, userId)))
      .execute();
    return result;
  }
  const result = await db
    .select()
    .from(grades)
    .innerJoin(subjects, eq(grades.subject_fk, subjects.id))
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

export async function deleteGradeFromDb(
  grade: Grade,
  userId: string
): Promise<number> {
  const result = await db
    .delete(grades)
    .where(and(eq(grades.id, grade.id), eq(grades.userId, userId)))
    .returning({ oldId: grades.id, oldGrade: grades.value })
    .execute();

  return (result[0].oldGrade || 0) as number;
}

export async function deleteGradeByIdFromDb(
  gradeId: number,
  userId: string
): Promise<number> {
  const result = await db
    .delete(grades)
    .where(and(eq(grades.id, gradeId), eq(grades.userId, userId)))
    .returning({ oldId: grades.id, oldGrade: grades.value })
    .execute();

  return (result[0].oldGrade || 0) as number;
}

export async function updateGradeInDb(
  grade: Grade,
  userId: string
): Promise<number> {
  console.log(grade);
  const result = await db
    .update(grades)
    .set(grade)
    .where(and(eq(grades.id, grade.id), eq(grades.userId, userId)))
    .returning({ value: grades.value })
    .execute();

  return (result[0].value || 0) as number;
}