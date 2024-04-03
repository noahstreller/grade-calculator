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

export async function addSubjectToDb(newSubject: NewSubject): Promise<number> {
  const result = await db
    .insert(subjects)
    .values(newSubject)
    .returning({ newId: subjects.id })
    .execute();
  return result[0].newId satisfies number;
}
