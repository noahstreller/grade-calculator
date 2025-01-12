import { GradeWithSubject, Preferences } from "@/db/schema";
import { ExportableData, importData } from "@/lib/services/export-service";
import { clearUserSubjectsGradesByCategory } from "@/lib/services/user-service";
import { importFailedToast } from "@/lib/toasts";
import { secondsSinceMidnight } from "@/lib/utils";
import { AverageWithSubject, Empty } from "@/types/types";

export function doesGradePass(
  grade: number,
  preferences: Preferences,
  simulatedGoalGrade?: number | Empty
): boolean {
  const passing = simulatedGoalGrade || preferences?.passingGrade!;
  if (preferences.passingInverse) {
    return grade <= passing;
  }
  return grade >= passing;
}

export function getSubjectAverages(averages: AverageWithSubject[]): number {
  if (averages.length === 0) {
    return 0;
  }
  let sum = 0;
  let count = 0;
  for (let average of averages) {
    if (
      average.average &&
      average.average.gradeAverage &&
      average.average.gradeAverage !== 0 &&
      average.subject.weight !== 0
    ) {
      sum += (average.subject.weight || 1) * average.average.gradeAverage;
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

export function exportToJSONFile(
  data: ExportableData,
  filename?: string | Empty
) {
  const json = JSON.stringify(data);
  const timestamp = new Date();
  const readableTimestamp = `${timestamp.getDate()}-${timestamp.getMonth()}-${timestamp.getFullYear()}_${secondsSinceMidnight()}`;
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download =
    filename && filename !== "Default"
      ? `${filename}_${readableTimestamp}.json`
      : `grades_${readableTimestamp}.json`;
  a.click();
}

export function exportToClipboard(data: ExportableData) {
  const json = JSON.stringify(data);
  navigator.clipboard.writeText(json);
}

export function importFromJSON(purge: boolean = true, categoryId: number) {
  try {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async () => {
      const file = input.files![0];
      const reader = new FileReader();
      reader.onload = async () => {
        const json = reader.result as string;
        if (!validateJSON(json)) return importFailedToast();
        const data = JSON.parse(json) as ExportableData;
        if (purge) {
          clearUserSubjectsGradesByCategory(categoryId).then(() => {
            importData(data, purge, categoryId).then(() => {
              window.location.reload();
            });
          });
        } else {
          importData(data, purge, categoryId).then(() => {
            window.location.reload();
          });
        }
      };
      reader.readAsText(file);
    };
    input.click();
  } catch (e) {
    importFailedToast();
  }
}

export function validateJSON(json: string): boolean {
  try {
    const data = JSON.parse(json);

    if (!data) return false;
    if (typeof data !== "object") return false;
    if (!data.subjects || !data.grades) return false;
    if (!Array.isArray(data.subjects) || !Array.isArray(data.grades))
      return false;
    return true;
  } catch (e) {
    return false;
  }
}

export function importFromText(
  purge: boolean = true,
  categoryId?: number | undefined
) {
  try {
    if (purge) {
      navigator.clipboard.readText().then((text) => {
        if (!validateJSON(text)) return importFailedToast();
        clearUserSubjectsGradesByCategory(categoryId!).then(() => {
          const data = JSON.parse(text) as ExportableData;
          importData(data, purge, categoryId).then(() => {
            window.location.reload();
          });
        });
      });
    } else {
      navigator.clipboard.readText().then((text) => {
        if (!validateJSON(text)) return importFailedToast();
        const data = JSON.parse(text) as ExportableData;
        importData(data, purge, categoryId).then(() => {
          window.location.reload();
        });
      });
    }
  } catch (e) {
    importFailedToast();
  }
}
