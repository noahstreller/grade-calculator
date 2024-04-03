"use server";
import { db } from "@/db";
import { NewSubject, subjects } from "@/db/schema";
import { setUserId } from "@/lib/services/service-util";

export async function addSubject(newSubject: NewSubject){
  newSubject = await setUserId(newSubject);
  const result = await db.insert(subjects).values(newSubject).returning({ newId: subjects.id }).execute();
  return result[0].newId;
}