"use server"
import { Grade, GradeWithSubject, NewGrade, Subject } from "@/db/schema";
import { Problem, catchProblem, getProblem } from "@/lib/problem";
import { addGradeToDb, deleteGradeByIdFromDb, deleteGradeFromDb, getAllGradesFromDb, getAllGradesWithSubjectFromDb, getGradesBySubjectFromDb, getGradesBySubjectWithSubjectFromDb } from "@/lib/repositories/grade-repo";
import { doesGradePass } from "@/lib/services/notAsyncLogic";
import { getPreferencesElseGetDefault } from "@/lib/services/preferences-service";
import { getUserId, setUserId } from "@/lib/services/service-util";
import { getAllSubjects, getSubjectByIdByNameBySubject } from "@/lib/services/subject-service";
import { Average, AverageWithSubject } from "@/types/types";

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

export async function getAllGradesWithSubject(): Promise<GradeWithSubject[] | Problem> {
  try {
    const userId = await getUserId();
    return await getAllGradesWithSubjectFromDb(userId);
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

export async function getGradeAverageWithSubjectBySubject(
  subject: string | number | Subject
): Promise<AverageWithSubject | Problem> {
  try {
    const userId = await getUserId();
    const grades = await getGradesBySubjectWithSubjectFromDb(subject, userId);
    const average = async (): Promise<AverageWithSubject> => {
      let sum = 0;
      if (grades.length === 0) {
        return {
          subject: catchProblem(await getSubjectByIdByNameBySubject(subject))
        }
      }
      grades.map((grade: GradeWithSubject) => {
        sum += grade.grades.value!;
      });
      return {
        average: {
          subjectId: grades[0].grades.subject_fk!,
          gradeAverage: sum / grades.length,
          gradeAmount: grades.length,
          passing: doesGradePass(
            sum / grades.length,
            catchProblem(await getPreferencesElseGetDefault())
          ),
        },
        subject: grades[0].subjects,
      };
    };
    return await average();
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
    const average = async(): Promise<Average> => {
      let sum = 0;
      grades.map((grade: Grade) => {
        sum += grade.value!;
      });
      return {
        subjectId: grades[0].subject_fk!,
        gradeAverage: sum / grades.length,
        gradeAmount: grades.length,
        passing: doesGradePass(
          sum / grades.length,
          catchProblem(await getPreferencesElseGetDefault())
        )
      };
    };
    return await average();
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
    const average = async () => {
      let promises = subjects.map((subject) =>
        getGradeAverageBySubject(subject)
      );
      let resolved: (Average | Problem)[] = await Promise.all(promises);
      let averages: Average[] = resolved.map((res) => {
        return catchProblem(res);
      });
      return averages;
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

export async function getAllGradeAveragesWithSubject(): Promise<AverageWithSubject[] | Problem> {
  try {
    const subjects: Subject[] = catchProblem(await getAllSubjects());
    const average = async () => {
      let promises = subjects.map((subject) =>
        getGradeAverageWithSubjectBySubject(subject)
      );
      let resolved: (AverageWithSubject | Problem)[] = await Promise.all(promises);
      let averages: AverageWithSubject[] = resolved.map((res) => {
        return catchProblem(res);
      });
      return averages;
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

export async function addGrade(newGrade: NewGrade): Promise<number | Problem> {
  try {
    newGrade = await setUserId(newGrade);
    return await addGradeToDb(newGrade);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
      e: JSON.stringify(e),
    }) satisfies Problem;
  }
}

export async function deleteGradeByGrade(
  grade: Grade
): Promise<number | Problem> {
  try {
    const userId = await getUserId();
    return catchProblem(await deleteGradeFromDb(grade, userId));
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
      e: JSON.stringify(e),
    }) satisfies Problem;
  }
}

export async function deleteGradeById(
  gradeId: number
): Promise<number | Problem> {
  try {
    const userId = await getUserId();
    return catchProblem(await deleteGradeByIdFromDb(gradeId, userId));
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
      e: JSON.stringify(e),
    }) satisfies Problem;
  }
}