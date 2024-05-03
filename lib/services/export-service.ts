"use server";

import {
  GradeWithSubject,
  NewGradeWithNewSubject,
  NewPreferences,
  Preferences,
} from "@/db/schema";
import { catchProblem } from "@/lib/problem";
import { addGrade, getAllGradesWithSubject } from "@/lib/services/grade-service";
import { getPreferences, savePreferences } from "@/lib/services/preferences-service";
import { addSubject, getSubjectIdElseAdd } from "@/lib/services/subject-service";

export type ExportableData = {
  preferences: NewPreferences | undefined;
  data: NewGradeWithNewSubject[];
};

export async function prepareDataForExport(): Promise<ExportableData> {
  const preferences: Preferences = catchProblem(await getPreferences())[0];
  const data: GradeWithSubject[] = catchProblem(
    await getAllGradesWithSubject()
  );

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

  const strippedData: NewGradeWithNewSubject[] = data.map((grade) => {
    return {
      grades: {
        value: grade.grades.value,
        weight: grade.grades.weight,
        date: grade.grades.date,
      },
      subjects: {
        name: grade.subjects.name,
      },
    };
  });

  const exportableData = {
    preferences: strippedPreferences(),
    data: strippedData,
  };
  return exportableData;
}

export async function importData(data: ExportableData, purge: boolean) {
  if (data.preferences) savePreferences(data.preferences);
  const nonUniqueSubjects = data.data.map((grade) => grade.subjects.name);
  const uniqueSubjects = [...new Set(nonUniqueSubjects)];
  const subjectWithIds = await Promise.all(uniqueSubjects.map(async (subjectName) => {
    const subject = { name: subjectName };
    if(purge) {
      let result = catchProblem(await addSubject(subject));
      return { name: subject.name, id: result };
    }
    else {
      let result = catchProblem(await getSubjectIdElseAdd(subject));
      return { name: subject.name, id: result };
    }
  }));

  let results = data.data.forEach(async (grade) => {
    let resultingSubject = subjectWithIds.find((subject) => subject.name === grade.subjects.name)?.id;
    grade.grades.subject_fk = resultingSubject;
    grade.grades.date = new Date(grade.grades.date || Date.now());
    let result = catchProblem(await addGrade(grade.grades));
    return result;
  });
  return results;
}
