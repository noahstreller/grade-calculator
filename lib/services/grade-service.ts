"use server"
import { Grade, NewGrade } from "@/db/schema";
import { addGradeToDb, getAllGradesFromDb } from "@/lib/repositories/grade-repo";
import { getUserId, setUserId } from "@/lib/services/service-util";

export async function getAllGrades(): Promise<Grade[]> {
  const userId = await getUserId();
  return await getAllGradesFromDb(userId);
}

export async function addGrade(newGrade: NewGrade): Promise<number> {
  newGrade = await setUserId(newGrade);
  return await addGradeToDb(newGrade);
}