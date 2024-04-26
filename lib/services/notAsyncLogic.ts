import { Preferences } from "@/db/schema";

export function doesGradePass(
  grade: number,
  preferences: Preferences
): boolean {
  if (preferences.passingInverse) {
    return grade <= preferences.passingGrade!;
  }
  return grade >= preferences.passingGrade!;
}
