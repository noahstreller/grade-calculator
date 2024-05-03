import { GradeWithSubject, Preferences } from "@/db/schema";
import { ExportableData, importData } from "@/lib/services/export-service";
import { clearUserSubjectsGrades } from "@/lib/services/user-service";
import { importFailedToast } from "@/lib/toasts";
import { AverageWithSubject } from "@/types/types";

export function doesGradePass(
  grade: number,
  preferences: Preferences
): boolean {
  if (preferences.passingInverse) {
    return grade <= preferences.passingGrade!;
  }
  return grade >= preferences.passingGrade!;
}

export function getSubjectAverages(averages: AverageWithSubject[]): number {
  if (averages.length === 0) {
    return 0;
  }
  let sum = 0;
  let count = 0;
  for (let average of averages) {
    if (average.average && average.average.gradeAverage && average.average.gradeAverage !== 0) {
      sum += average.average.gradeAverage;
      count++;
    }
  }
  return sum / count;
}

export function getTotalGradeAverages(grades: GradeWithSubject[]): number {
  if (grades.length === 0) {
    return 0;
  }
  let sum = 0;
  let count = 0;
  for (let grade of grades) {
    if (grade.grades && grade.grades.value && grade.grades.value !== 0) {
      sum += grade.grades.value;
      count++;
    }
  }
  return sum / count;
}

export function exportToJSONFile(data: ExportableData) {
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "gradedata.json";
  a.click();
}

export function exportToClipboard(data: ExportableData) {
  const json = JSON.stringify(data);
  navigator.clipboard.writeText(json);
}

export function importFromJSON() {
  try {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async () => {
      const file = input.files![0];
      const reader = new FileReader();
      reader.onload = async () => {
        const json = reader.result as string;
        const data = JSON.parse(json) as ExportableData;
        clearUserSubjectsGrades().then(() => {
          importData(data).then(() => {
            window.location.reload();
          });
        });
      };
      reader.readAsText(file);
    };
    input.click();
  } catch (e) {
    importFailedToast();
  }
}

export function importFromText() {
  try {
    navigator.clipboard.readText().then((text) => {
      clearUserSubjectsGrades().then(() =>{
        const data = JSON.parse(text) as ExportableData;
        importData(data).then(() => {
          window.location.reload();
        });
      });
    });
  }
  catch (e) {
    importFailedToast();
  }
}