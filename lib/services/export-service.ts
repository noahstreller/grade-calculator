"use server";

import {
  GradeWithSubject,
  NewGradeWithNewSubject,
  NewPreferences,
  NewSubject,
  Preferences,
  Subject,
} from "@/db/schema";
import { catchProblem } from "@/lib/problem";
import {
  addGrade,
  getAllGradesWithSubject,
} from "@/lib/services/grade-service";
import {
  getPreferences,
  savePreferences,
} from "@/lib/services/preferences-service";
import {
  addSubject,
  getAllSubjects,
  getSubjectIdElseAdd,
} from "@/lib/services/subject-service";

export type ExportableData = {
  preferences: NewPreferences | undefined;
  grades: NewGradeWithNewSubject[];
  subjects: NewSubject[];
};

export async function prepareDataForExport(): Promise<ExportableData> {
  const preferences: Preferences = catchProblem(await getPreferences())[0];
  const grades: GradeWithSubject[] = catchProblem(
    await getAllGradesWithSubject()
  );
  const subjects: Subject[] = catchProblem(await getAllSubjects());

  const strippedPreferences = (): NewPreferences | undefined => {
    if (preferences)
      return {
        passingGrade: preferences.passingGrade,
        minimumGrade: preferences.minimumGrade,
        maximumGrade: preferences.maximumGrade,
        gradeDecimals: preferences.gradeDecimals,
        newEntitySheetShouldStayOpen: preferences.newEntitySheetShouldStayOpen,
        passingInverse: preferences.passingInverse,
      };

    return undefined;
  };

  const strippedGrades: NewGradeWithNewSubject[] = grades.map((grade) => {
    return {
      grades: {
        value: grade.grades.value,
        weight: grade.grades.weight,
        date: grade.grades.date,
        description: grade.grades.description,
      },
      subjects: {
        name: grade.subjects.name,
      },
    };
  });

  const strippedSubjects: NewSubject[] = subjects.map((subject) => {
    return {
      name: subject.name,
    };
  });

  const exportableData = {
    preferences: strippedPreferences(),
    grades: strippedGrades,
    subjects: strippedSubjects,
  };
  return exportableData;
}

export async function importData(data: ExportableData, purge: boolean) {
  if (data.preferences) savePreferences(data.preferences);
  const nonUniqueSubjectsFromGrades = data.grades.map(
    (grade) => grade.subjects.name
  );
  const nonUniqueSubjectsFromSubjects = data.subjects.map(
    (subject) => subject.name
  );
  const nonUniqueSubjects = [
    ...nonUniqueSubjectsFromGrades,
    ...nonUniqueSubjectsFromSubjects,
  ];
  const uniqueSubjects = [...new Set(nonUniqueSubjects)];
  const subjectWithIds = await Promise.all(
    uniqueSubjects.map(async (subjectName) => {
      const subject = { name: subjectName };
      if (purge) {
        let result = catchProblem(await addSubject(subject));
        return { name: subject.name, id: result };
      } else {
        let result = catchProblem(await getSubjectIdElseAdd(subject));
        return { name: subject.name, id: result };
      }
    })
  );

  let results = data.grades.forEach(async (grade) => {
    let resultingSubject = subjectWithIds.find(
      (subject) => subject.name === grade.subjects.name
    )?.id;
    grade.grades.subject_fk = resultingSubject;
    grade.grades.date = new Date(grade.grades.date || Date.now());
    let result = catchProblem(await addGrade(grade.grades));
    return result;
  });
  return results;
}
