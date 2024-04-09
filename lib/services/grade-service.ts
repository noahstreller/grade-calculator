"use server"
import { Grade, NewGrade, Subject } from "@/db/schema";
import { Problem, catchProblem, getProblem } from "@/lib/problem";
import { addGradeToDb, getAllGradesFromDb, getGradesBySubjectFromDb } from "@/lib/repositories/grade-repo";
import { getUserId, setUserId } from "@/lib/services/service-util";
import { getAllSubjects } from "@/lib/services/subject-service";
import { Average } from "@/types/types";

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

export async function getGradesBySubject(
  subject: string | number | Subject
): Promise<Grade[] | Problem> {
  try {
    const userId = await getUserId();
    return await getGradesBySubjectFromDb(subject, userId);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function getGradeAverageBySubject(
  subject: string | number | Subject
): Promise<Average | Problem> {
  try {
    const userId = await getUserId();
    const grades = await getGradesBySubjectFromDb(subject, userId);
    const average = (): Average => {
      let sum = 0;
      grades.map((grade: Grade) => {
        sum += grade.value!;
      });
      return {
        subjectId: grades[0].subject_fk!,
        gradeAverage: sum / grades.length,
        gradeAmount: grades.length,
        passing: () => {
          return true;
        },
      } satisfies Average;
    };
    return average();
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function getAllGradeAverages(): Promise<Average[] | Problem> {
  try {
    const subjects: Subject[] = catchProblem(await getAllSubjects());
    const average = () => {
      let averages: Average[] = [];
      subjects.map(async (subject) => {
        averages = [...averages, ...catchProblem(await getGradeAverageBySubject(subject))];
      });
      return averages;
    }
    return average();
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