"use server";
import { db } from "@/db";
import { NewSubject, Subject, subjects } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function addSubjectToDb(newSubject: NewSubject): Promise<number> {
  const result = await db
    .insert(subjects)
    .values(newSubject)
    .returning({ newId: subjects.id })
    .execute();
  return result[0].newId satisfies number;
}

export async function getAllSubjectsFromDb(userId: string): Promise<Subject[]> {
  const result = await db
    .select()
    .from(subjects)
    .where(eq(subjects.userId, userId))
    .execute();
  return result satisfies Subject[];
}