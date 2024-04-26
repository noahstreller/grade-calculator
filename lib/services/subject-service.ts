"use server";
import { NewSubject, Subject } from "@/db/schema";
import { Problem, catchProblem, getProblem } from "@/lib/problem";
import {
  addSubjectToDb,
  getAllSubjectsFromDb,
  getSubjectByIdFromDb,
  getSubjectByNameFromDb,
} from "@/lib/repositories/subject-repo";
import { getUserId, setUserId } from "@/lib/services/service-util";

export async function getAllSubjects(): Promise<Subject[] | Problem> {
  try {
    const userId = await getUserId();
    return await getAllSubjectsFromDb(userId);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function getSubjectById(subjectId: number): Promise<Subject | Problem> {
  try {
    const userId = await getUserId();
    return await getSubjectByIdFromDb(subjectId, userId);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function getSubjectByName(
  subjectName: string
): Promise<Subject | Problem> {
  try {
    const userId = await getUserId();
    return await getSubjectByNameFromDb(subjectName, userId);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}


export async function addSubject(newSubject: NewSubject): Promise<number | Problem> {
  try{
    newSubject = await setUserId(newSubject);
    return await addSubjectToDb(newSubject);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function quickCreateSubject(name: string): Promise<number | Problem> {
  try {
    const userId = await getUserId();
    const newSubject: NewSubject = {
      name,
      weight: 1,
      userId,
    } satisfies NewSubject;
    return await addSubject(newSubject);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function getSubjectByIdByNameBySubject(
  subject: string | number | Subject,
): Promise<Subject | Problem> {
  try {
    if (typeof subject === "string") {
      return catchProblem(await getSubjectByName(subject));
    }
    if (typeof subject === "number") {
      return catchProblem(await getSubjectById(subject));
    }
    return subject;
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}