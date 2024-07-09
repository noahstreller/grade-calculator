"use server";
import { Grade, NewPreferences, Preferences } from "@/db/schema";
import { Problem, catchProblem, getProblem } from "@/lib/problem";
import {
  addPreferencesToDb,
  getPreferencesFromDb,
  updatePreferencesInDb,
} from "@/lib/repositories/preferences-repo";
import { getAllGrades, updateGrade } from "@/lib/services/grade-service";
import { getUserId, setUserId } from "@/lib/services/service-util";
import { getDefaultPreferences } from "@/lib/utils";

export async function getPreferences(): Promise<Preferences[] | Problem> {
  try {
    const userId = await getUserId();
    return await getPreferencesFromDb(userId);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function getPreferencesElseGetDefault(): Promise<
  { preferences: Preferences; isDefault: boolean } | Problem
> {
  try {
    const userId = await getUserId();
    let result = await getPreferencesFromDb(userId);
    if (result.length === 1) {
      return { preferences: result[0], isDefault: false };
    }
    return { preferences: getDefaultPreferences(), isDefault: true };
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function savePreferences(
  newPreferences: NewPreferences
): Promise<Preferences | Problem> {
  try {
    newPreferences = await setUserId(newPreferences);
    adjustGradesToPreferences(newPreferences as Preferences);
    let existing: Preferences[] = catchProblem(await getPreferences());
    if (existing.length > 0) {
      newPreferences.id = existing[0].id;
      return await updatePreferencesInDb(newPreferences);
    }
    return await addPreferencesToDb(newPreferences);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function adjustGradesToPreferences(preferences: Preferences) {
  try {
    let grades: Grade[] = catchProblem(await getAllGrades());
    grades.map((grade) => {
      let modifiedGrade = grade;
      let wasModified = false;
      if (grade.value! > preferences.maximumGrade!) {
        modifiedGrade.value = preferences.maximumGrade;
        wasModified = true;
      }
      if (grade.value! < preferences.minimumGrade!) {
        modifiedGrade.value = preferences.minimumGrade;
        wasModified = true;
      }
      if (wasModified) {
        updateGrade(modifiedGrade);
      }
    });
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}
