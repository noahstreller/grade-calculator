"use server";
import { db } from "@/db";
import { NewSubject, Subject, subjects } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getAllSubjectsFromDb(userId: string): Promise<Subject[]> {
  const result = await db
    .select()
    .from(subjects)
    .where(eq(subjects.userId, userId))
    .execute();
  return result satisfies Subject[];
}

export async function getSubjectByIdFromDb(
  subjectId: number,
  userId: string
): Promise<Subject> {
  const result = await db
    .select()
    .from(subjects)
    .where(and(eq(subjects.id, subjectId), eq(subjects.userId, userId)))
    .execute();
  return result[0] satisfies Subject;
}

export async function getSubjectByNameFromDb(
  subjectName: string,
  userId: string
) {
  const result = await db
    .select()
    .from(subjects)
    .where(and(eq(subjects.name, subjectName), eq(subjects.userId, userId)))
    .execute();
  return result[0] satisfies Subject;
}

export async function addSubjectToDb(newSubject: NewSubject): Promise<number> {
  const result = await db
    .insert(subjects)
    .values(newSubject)
    .returning()
    .execute();
  return result[0].id satisfies number;
}

export async function addSubjectToDbReturning(
  newSubject: NewSubject
): Promise<Subject> {
  const result = await db
    .insert(subjects)
    .values(newSubject)
    .returning()
    .execute();
  return result[0] satisfies Subject;
}

export async function deleteSubjectFromDb(
  subject: Subject,
  userId: string
): Promise<string> {
  const result = await db
    .delete(subjects)
    .where(and(eq(subjects.id, subject.id), eq(subjects.userId, userId)))
    .returning()
    .execute();
  return (result[0].name || "") satisfies string;
}

export async function updateSubjectInDb(
  subject: Subject,
  userId: string
): Promise<string> {
  const result = await db
    .update(subjects)
    .set(subject)
    .where(and(eq(subjects.id, subject.id), eq(subjects.userId, userId)))
    .returning()
    .execute();
  return (result[0].name || "") satisfies string;
}
