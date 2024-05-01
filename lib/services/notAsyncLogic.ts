import { GradeWithSubject, Preferences } from "@/db/schema";
import { AverageWithSubject } from "@/types/types";

export function doesGradePass(
  grade: number,
  preferences: Preferences
): boolean {
  if (preferences.passingInverse) {
    return grade <= preferences.passingGrade!;
  }
  return grade >= preferences.passingGrade!;
}

export function getSubjectAverages(averages: AverageWithSubject[]): number {
  if (averages.length === 0) {
    return 0;
  }
  let sum = 0;
  let count = 0;
  for (let average of averages) {
    if (average.average && average.average.gradeAverage && average.average.gradeAverage !== 0) {
      sum += average.average.gradeAverage;
      count++;
    }
  }
  return sum / count;
}

export function getTotalGradeAverages(grades: GradeWithSubject[]): number {
  if (grades.length === 0) {
    return 0;
  }
  let sum = 0;
  let count = 0;
  for (let grade of grades) {
    if (grade.grades && grade.grades.value && grade.grades.value !== 0) {
      sum += grade.grades.value;
      count++;
    }
  }
  return sum / count;
}