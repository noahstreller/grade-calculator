"use server"
import { db } from "@/db";
import { Grade, NewGrade, grades } from "@/db/schema";
import { getUser, setUserId } from "@/lib/services/service-util";
import { eq } from "drizzle-orm";


export async function getAllGrades(): Promise<Grade[]> {
  const user = await getUser();
  const result = await db.select().from(grades).where(eq(grades.userId, user?.uid!)).execute();
  result.map((grade) => {
    console.log(grade);
  });
  return result;
}

export async function addGrade(newGrade: NewGrade){
  newGrade = await setUserId(newGrade);
  const result = await db.insert(grades).values(newGrade).returning({ newId: grades.id }).execute();
  return result[0].newId;
}
