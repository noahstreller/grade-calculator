import { Subject } from "@/db/schema";

export type Empty = undefined | null;
export type Average = {
  subjectId: number,
  gradeAverage: number | Empty,
  gradeAmount: number,
  gradeSum: number | Empty,
  passing: boolean | Empty,
}

export type AverageWithSubject = {
  subject: Subject,
  average?: Average | Empty,
}