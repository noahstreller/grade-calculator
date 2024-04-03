"use server";
import { NewSubject, Subject } from "@/db/schema";
import { addSubjectToDb, getAllSubjectsFromDb } from "@/lib/repositories/subject-repo";
import { getUserId, setUserId } from "@/lib/services/service-util";

export async function getAllSubjects(): Promise<Subject[]>{
  const userId = await getUserId();
  return getAllSubjectsFromDb(userId);
}

export async function addSubject(newSubject: NewSubject): Promise<number>{
  newSubject = await setUserId(newSubject);
  return await addSubjectToDb(newSubject);
}