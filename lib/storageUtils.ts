import { exportToast, importFailedToast } from "@/lib/toasts";
import { AppGlobalsType, getAppGlobals } from "./app.globals";
import Grade from "./entities/grade";

export type ExportableType = {
  preferences: AppGlobalsType,
  subjects: string[],
  grades: Grade[]
}

export const getData = (): ExportableType => {
  let preferencesString = localStorage.getItem("preferences");
  let preferences: AppGlobalsType;
  if (preferencesString) preferences = JSON.parse(preferencesString);
  else preferences = getAppGlobals();

  let subjectsString = localStorage.getItem("subjects");
  let subjects: string[];
  if (subjectsString) subjects = JSON.parse(subjectsString);
  else subjects = [];

  let gradesString = localStorage.getItem("grades");
  let grades: Grade[];
  if (gradesString) grades = JSON.parse(gradesString);
  else grades = [];

  let result: ExportableType = {
    preferences: preferences,
    subjects: subjects,
    grades: grades
  };
  return result;
}

export const setData = (data: ExportableType, reload: boolean = true) => {
  localStorage.setItem("preferences", JSON.stringify(data.preferences));
  localStorage.setItem("subjects", JSON.stringify(data.subjects));
  localStorage.setItem("grades", JSON.stringify(data.grades));
  if(reload) window.location.reload();
}

export const backup = (data: ExportableType) => {
  localStorage.setItem("gradeBackup", JSON.stringify(data));
  return data;
}

export const restoreBackup = () => {
  let backup = localStorage.getItem("gradeBackup");
  if (backup) {
    let data = JSON.parse(backup);
    setData(data, false);
  }
}

export const importFromText = async() => {
  backup(getData())
  const data = await navigator.clipboard.readText();
  try {
    let results: ExportableType = JSON.parse(data) as ExportableType;
    setData(results);
  } catch (e) {
    importFailedToast();
  }
}

export const importFromJSON = () => {
  backup(getData())
  console.log("Importing from JSON");
}

export const exportToText = () => {
  let data = getData();
  exportToast("clipboard");
  navigator.clipboard.writeText(JSON.stringify(data));
  return JSON.stringify(data);
}

export const exportToJSON = () => {
  console.log("Exporting to JSON");
  exportToast("json");
}