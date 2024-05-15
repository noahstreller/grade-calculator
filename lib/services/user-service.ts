"use server";

import { Account, Grade, Subject, User } from "@/db/schema";
import { Problem, getProblem } from "@/lib/problem";
import {
  clearUserGradesByCategoryFromDb,
  clearUserGradesFromDb,
  clearUserSubjectsGradesByCategoryFromDb,
  clearUserSubjectsGradesFromDb,
  deleteUserDataFromDb,
  getRefreshTokenFromDb,
  saveRefreshTokenIntoDb,
} from "@/lib/repositories/user-repo";
import { getUserId } from "@/lib/services/service-util";
import { Empty } from "@/types/types";

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

export async function clearUserSubjectsGradesByCategory(
  categoryId: number
): Promise<Subject[] | Problem> {
  try {
    const userId = await getUserId();
    return await clearUserSubjectsGradesByCategoryFromDb(userId, categoryId);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function clearUserGrades(): Promise<Grade[] | Problem> {
  try {
    const userId = await getUserId();
    return await clearUserGradesFromDb(userId);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function clearUserGradesByCategory(
  categoryId: number
): Promise<Grade[] | Problem> {
  try {
    const userId = await getUserId();
    return await clearUserGradesByCategoryFromDb(userId, categoryId);
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

export async function saveRefreshToken(
  userId: string,
  refreshToken: string
): Promise<Problem | Account> {
  try {
    return await saveRefreshTokenIntoDb(userId, refreshToken);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function getRefreshToken(
  userId: string
): Promise<string | Empty | Problem> {
  try {
    return await getRefreshTokenFromDb(userId);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}
