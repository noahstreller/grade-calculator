"use server"
import { NewGrade, NewPreferences, NewSubject } from "@/db/schema";
import { auth } from "@/lib/auth";

export const getUser = async () => (await auth())?.user;

export const setUserId = async (object: NewSubject | NewGrade | NewPreferences) => {
  object.userId = (await getUser())?.uid!;
  return object;
};
