import { Grade, NewGrade } from "@/db/schema";
import { Problem } from "@/lib/problem";
import { addGrade } from "@/lib/services/grade-service";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export function addGradeToast(grade: NewGrade, subjectName: string) {
  toast("The grade was added", {
    description: `${grade.value} in ${subjectName}`,
    action: {
      label: "Got it.",
      onClick: () => void 0,
    },
  });
}

export function editGradeToast(grade: NewGrade, subjectName: string) {
  toast("The grade was updated", {
    description: `${grade.value} in ${subjectName}`,
    action: {
      label: "Got it.",
      onClick: () => void 0,
    },
  });
}

export function addSubjectToast(subject: string) {
  toast("The subject was added", {
    description: subject,
    action: {
      label: "Got it",
      onClick: () => void 0,
    },
  });
}

export function addCategoryToast(category: string) {
  toast("The category was added", {
    description: category,
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
  toast("Copied to clipboard", {
    description: copiedContent,
    action: {
      label: "Got it.",
      onClick: () => void 0,
    },
  });
}

export function deleteGradeToast(
  grade: Grade,
  subjectName: string,
  refresh: Function
) {
  toast("The item was deleted", {
    description: grade.value,
    action: {
      label: "Undo",
      onClick: async () => {
        await addGrade(grade);
        addGradeToast(grade, subjectName);
        refresh();
      },
    },
  });
}

export function deleteSubjectToast(subject: string) {
  toast("The item was deleted", {
    description: subject,
    action: {
      label: "Got it.",
      onClick: () => void 0,
    },
  });
}

export function exportToast(method: "json" | "clipboard") {
  let message = method === "json" ? "Exported as JSON" : "Copied to clipboard";

  toast("Data successfully exported", {
    description: message,
    action: {
      label: "Got it.",
      onClick: () => void 0,
    },
  });
}

export function importFailedToast() {
  toast.error("Import failed, check the data and try again.");
}

export function toastProblem(problem: Problem) {
  let errorMessage = (
    <>
      <AlertTriangle className="size-4 mr-2 text-red-400" />
      {problem.finalMessage}
    </>
  );
  toast(errorMessage, {
    description: problem.solution,
    action: {
      label: "Got it.",
      onClick: () => void 0,
    },
  });
}
