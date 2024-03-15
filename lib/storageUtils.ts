import { exportToast, importFailedToast } from "@/lib/toasts";
import { AppGlobalsType, getAppGlobals } from "./app.globals";
import Grade from "./entities/grade";

export type ExportableType = {
  preferences: AppGlobalsType;
  subjects: string[];
  grades: Grade[];
};

export const getData = (): ExportableType => {
  let preferencesString = localStorage.getItem("preferences");
  let preferences: AppGlobalsType;
  if (
    preferencesString &&
    preferencesString != "undefined" &&
    preferencesString != "null"
  )
    preferences = JSON.parse(preferencesString);
  else preferences = getAppGlobals();

  let subjectsString = localStorage.getItem("subjects");
  let subjects: string[];
  if (
    subjectsString &&
    subjectsString != "undefined" &&
    subjectsString != "null"
  )
    subjects = JSON.parse(subjectsString);
  else subjects = [];

  let gradesString = localStorage.getItem("grades");
  let grades: Grade[];
  if (
    gradesString &&
    gradesString != "undefined" &&
    gradesString != "null"
  )
    grades = JSON.parse(gradesString);
  else grades = [];

  let result: ExportableType = {
    preferences: preferences,
    subjects: subjects,
    grades: grades,
  };
  return result;
};

export const setData = (data: ExportableType, reload: boolean = true) => {
  localStorage.setItem("preferences", JSON.stringify(data.preferences));
  localStorage.setItem("subjects", JSON.stringify(data.subjects));
  localStorage.setItem("grades", JSON.stringify(data.grades));
  if (reload) window.location.reload();
};

export const backup = (data: ExportableType) => {
  localStorage.setItem("gradeBackup", JSON.stringify(data));
  return data;
};

export const restoreBackup = () => {
  let backup = localStorage.getItem("gradeBackup");
  if (backup) {
    let data = JSON.parse(backup);
    setData(data, false);
  }
};

export const importFromText = async () => {
  backup(getData());
  const data = await navigator.clipboard.readText();
  try {
    let results: ExportableType = JSON.parse(data) as ExportableType;
    setData(results);
  } catch (e) {
    importFailedToast();
  }
};

export const importFromJSON = () => {
  backup(getData());
  let element = document.createElement("input");
  element.setAttribute("type", "file");
  element.setAttribute("accept", ".json");
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  element.addEventListener("change", async () => {
    let file = element.files?.item(0);
    if (file) {
      let reader = new FileReader();
      reader.onload = async (e) => {
        try {
          let results: ExportableType = JSON.parse(
            e.target?.result as string
          ) as ExportableType;
          setData(results);
        } catch (e) {
          importFailedToast();
        }
      };
      reader.readAsText(file);
    }
  });
};

export const exportToText = () => {
  let data = getData();
  exportToast("clipboard");
  navigator.clipboard.writeText(JSON.stringify(data));
  return JSON.stringify(data);
};

export const exportToJSONFile = () => {
  let data = getData();
  exportToast("json");
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(data))
  );
  element.setAttribute("download", "grades.json");
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
};
