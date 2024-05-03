
import { Grade, NewGrade } from "@/db/schema";
import { Problem } from "@/lib/problem";
import { addGrade } from "@/lib/services/grade-service";
import createTranslation from "next-translate/createTranslation";
import { toast } from "sonner";

function t(key: string) {
  const {t} = createTranslation("common");
  return t(key);
}

function lang() {
  const {lang} = createTranslation("common");
  return lang;
}

export function addGradeToast(grade: NewGrade, subjectName: string) {
  toast(t("grades.add-success"), {
    description: `${grade.value} in ${subjectName}`,
    action: {
      label: t("actions.ok"),
      onClick: () => void 0,
    },
  });
}

export function editGradeToast(grade: NewGrade, subjectName: string) {
  toast("The grade was updated", {
    description: `${grade.value} in ${subjectName}`,
    action: {
      label: t("actions.ok"),
      onClick: () => void 0,
    },
  });
}

export function addSubjectToast(subject: string) {
  toast(t("subjects.add-success"), {
    description: subject,
    action: {
      label: "Got it",
      onClick: () => void 0,
    },
  });
}

export function editSubjectToast(subject: string) {
  toast("The subject was updated", {
    description: subject,
    action: {
      label: "Got it",
      onClick: () => void 0,
    },
  });
}

export function copySuccessToast(copiedContent: string) {
  toast(t("actions.copy.success"), {
    description: copiedContent,
    action: {
      label: t("actions.ok"),
      onClick: () => void 0,
    },
  });
}

export function deleteGradeToast(grade: Grade, subjectName: string, refresh: Function){
  toast(t("actions.delete.success"), {
    description: grade.value,
    action: {
      label: t("actions.undo"),
      onClick: async () => {
        await addGrade(grade);
        addGradeToast(grade, subjectName);
        refresh();
      },
    },
  });
}

export function deleteSubjectToast(subject: string){
  toast(t("actions.delete.success"), {
    description: subject,
    action: {
      label: t("actions.ok"),
      onClick: () => void 0,
    },
  });
}

export function exportToast(method: "json" | "clipboard"){
  toast(t("actions.export.success"), {
    description: t(`actions.export.description-${method}`),
    action: {
      label: t("actions.ok"),
      onClick: () => void 0,
    },
  });
}

export function importFailedToast(){
  toast.error(t("errors.import-failed"));
}

export function toastProblem(problem: Problem) {
  toast(problem.finalMessage, {
    description: problem.solution,
    action: {
      label: t("actions.ok"),
      onClick: () => void 0,
    },
  });
}