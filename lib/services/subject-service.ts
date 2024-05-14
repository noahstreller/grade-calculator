"use server";
import { NewSubject, Subject } from "@/db/schema";
import { Problem, catchProblem, getProblem } from "@/lib/problem";
import {
  addSubjectToDb,
  deleteSubjectFromDb,
  getAllSubjectsFromDb,
  getSubjectByIdFromDb,
  getSubjectByNameFromDb,
  updateSubjectInDb,
} from "@/lib/repositories/subject-repo";
import { getUserId, setUserId } from "@/lib/services/service-util";

export async function getAllSubjects(
  categoryId?: number | undefined,
): Promise<Subject[] | Problem> {
  try {
    const userId = await getUserId();
    return await getAllSubjectsFromDb(userId, categoryId);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function getSubjectById(
  subjectId: number,
): Promise<Subject | Problem> {
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
  subjectName: string,
  categoryId?: number | undefined,
): Promise<Subject | Problem> {
  try {
    const userId = await getUserId();
    return await getSubjectByNameFromDb(subjectName, userId, categoryId);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function addSubject(
  newSubject: NewSubject,
): Promise<number | Problem> {
  try {
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

export async function getSubjectIdElseAdd(
  newSubject: NewSubject,
): Promise<number | Problem> {
  try {
    const userId = await getUserId();
    newSubject = await setUserId(newSubject);
    const subject = await getSubjectByNameFromDb(newSubject.name!, userId);
    if (subject) return subject.id;
    return await addSubjectToDb(newSubject);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function quickCreateSubject(
  name: string,
  categoryId?: number | undefined,
): Promise<number | Problem> {
  try {
    const userId = await getUserId();
    const newSubject: NewSubject = {
      name,
      weight: 1,
      userId,
      category_fk: categoryId,
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
  categoryId?: number | undefined,
): Promise<Subject | Problem> {
  try {
    if (typeof subject === "string") {
      return catchProblem(await getSubjectByName(subject, categoryId));
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

export async function deleteSubject(
  subject: string | number | Subject,
): Promise<string | Problem> {
  try {
    let resolvedSubject = catchProblem(
      await getSubjectByIdByNameBySubject(subject),
    );
    const userId = await getUserId();
    return await deleteSubjectFromDb(resolvedSubject, userId);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function updateSubject(
  subject: Subject,
): Promise<string | Problem> {
  try {
    const userId = await getUserId();
    return await updateSubjectInDb(subject, userId);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}
