import { InvalidPreferenceError } from "./errors";

export type AppGlobalsType = {
  passingGrade: number;
  minimumGrade: number;
  maximumGrade: number;
  gradeDecimals: number;
  newEntitySheetShouldStayOpen: boolean;
  passingInverse: boolean;
};

export const defaultAppGlobals: AppGlobalsType = {
  passingGrade: 4,
  minimumGrade: 1,
  maximumGrade: 6,
  gradeDecimals: 3,
  newEntitySheetShouldStayOpen: false,
  passingInverse: false,
};

let appGlobals = loadAppGlobals() || defaultAppGlobals;

export function updateAppGlobals(newGlobals: AppGlobalsType) {
  if (typeof window !== "undefined") {
    appGlobals = { ...newGlobals };
    localStorage.setItem("preferences", JSON.stringify(appGlobals));
    return;
  }
  console.error("Cannot update appGlobals on server side");
}

export function loadAppGlobals() {
  if (typeof window !== "undefined") {
    let preferences = localStorage.getItem("preferences");
    if (preferences) {
      if(validatePreferences(JSON.parse(preferences))) return JSON.parse(preferences);
      return false;
    }
  }
  return false;
}

export function getAppGlobals() {
  return appGlobals;
}

export function validatePreferences(globals: AppGlobalsType): boolean {
  try {
    if(globals.passingGrade === undefined || globals.minimumGrade === undefined || globals.maximumGrade === undefined || globals.gradeDecimals === undefined || globals.newEntitySheetShouldStayOpen === undefined || globals.passingInverse === undefined) {
      throw new InvalidPreferenceError();
    }

    if (globals.minimumGrade > globals.maximumGrade) {
      throw new InvalidPreferenceError();
    }
    if (globals.passingGrade < globals.minimumGrade || globals.passingGrade > globals.maximumGrade) {
      throw new InvalidPreferenceError();
    }
    if (globals.passingGrade < 1 || globals.passingGrade > 6) {
      throw new InvalidPreferenceError();
    }
  }
  catch (e) {
    console.error(e);
    return false;
  }
  return true;
}

export default appGlobals;
