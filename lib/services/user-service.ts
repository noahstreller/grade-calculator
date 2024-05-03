"use server"

import { Subject, User } from "@/db/schema";
import { Problem, getProblem } from "@/lib/problem";
import { clearUserSubjectsGradesFromDb, deleteUserDataFromDb } from "@/lib/repositories/user-repo";
import { getUserId } from "@/lib/services/service-util";

export async function clearUserSubjectsGrades(): Promise<Subject[] | Problem> {
  try {
    const userId = await getUserId();
    return await clearUserSubjectsGradesFromDb(userId);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function clearUserData(): Promise<User | Problem> {
  try {
    const userId = await getUserId();
    return await deleteUserDataFromDb(userId);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}