
import { toast } from "sonner";
import Grade from "./entities/grade";
import createTranslation from "next-translate/createTranslation";

function t(key: string) {
  const {t} = createTranslation("common");
  return t(key);
}

function lang() {
  const {lang} = createTranslation("common");
  return lang;
}

export function addGradeToast(grade: Grade) {
  toast(t("grades.add-success"), {
    description: grade.getGradeInformation(),
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
  })
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

export function deleteGradeToast(grade: Grade, refresh: Function){
  toast(t("actions.delete.success"), {
    description: grade.getGradeInformation(),
    action: {
      label: t("actions.undo"),
      onClick: () => {
        grade.save();
        addGradeToast(grade);
        refresh();
      },
    },
  });
}