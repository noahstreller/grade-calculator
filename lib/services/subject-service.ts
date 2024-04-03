"use server";
import { NewSubject, Subject } from "@/db/schema";
import { Problem, getProblem } from "@/lib/problem";
import {
  addSubjectToDb,
  getAllSubjectsFromDb,
  getSubjectByIdFromDb,
} from "@/lib/repositories/subject-repo";
import { getUserId, setUserId } from "@/lib/services/service-util";

export async function getAllSubjects(): Promise<Subject[]> {
  const userId = await getUserId();
  return await getAllSubjectsFromDb(userId);
}

export async function getSubjectById(subjectId: number): Promise<Subject> {
  const userId = await getUserId();
  return await getSubjectByIdFromDb(subjectId, userId);
}

export async function addSubject(newSubject: NewSubject): Promise<number> {
  newSubject = await setUserId(newSubject);
  return await addSubjectToDb(newSubject);
}

export async function quickCreateSubject(name: string): Promise<number | Problem> {
  const userId = await getUserId();
  try {
    const newSubject: NewSubject = {
      name,
      weight: 1,
      userId,
    } satisfies NewSubject;
    return await addSubject(newSubject);
  } catch (e: any) {
    return getProblem({
      message: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}