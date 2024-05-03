"use server";
import { NewPreferences, Preferences } from "@/db/schema";
import { Problem, catchProblem, getProblem } from "@/lib/problem";
import { addPreferencesToDb, getPreferencesFromDb, updatePreferencesInDb } from "@/lib/repositories/preferences-repo";
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

export async function getPreferencesElseGetDefault(): Promise<Preferences | Problem> {
  try {
    const userId = await getUserId();
    let result = await getPreferencesFromDb(userId);
    if (result.length === 1) {
      return result[0];
    }
    return getDefaultPreferences();

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
