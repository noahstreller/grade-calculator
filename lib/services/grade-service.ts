"use server"
import { Grade, NewGrade } from "@/db/schema";
import { Problem, getProblem } from "@/lib/problem";
import { addGradeToDb, getAllGradesFromDb } from "@/lib/repositories/grade-repo";
import { getUserId, setUserId } from "@/lib/services/service-util";

export async function getAllGrades(): Promise<Grade[] | Problem> {
  try {
    const userId = await getUserId();
    return await getAllGradesFromDb(userId);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function addGrade(newGrade: NewGrade): Promise<number | Problem> {
  try {
    newGrade = await setUserId(newGrade);
    return await addGradeToDb(newGrade);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
      e: JSON.stringify(e)
    }) satisfies Problem;
  }
}