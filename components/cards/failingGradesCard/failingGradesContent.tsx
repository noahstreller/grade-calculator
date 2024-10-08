import { columns } from "@/components/cards/failingGradesCard/columns";
import { DataTable } from "@/components/cards/failingGradesCard/data-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { AverageWithSubject } from "@/types/types";
import { Bird } from "lucide-react";
import { useTranslations } from "next-intl";

export function FailingGradesContent({ data }: { data: AverageWithSubject[] }) {
  const t = useTranslations();
  const colTranslations = {
    grades: {
      subject: t("grades.subject"),
      grade: t("grades.grade"),
    },
  };
  return (
    <CardContent className="mt-5">
      <CardTitle>{t("subjects.failing-title")}</CardTitle>
      <CardDescription>{t("subjects.failing-subjects-desc")}</CardDescription>
      {data.length === 0 ? (
        <Alert>
          <Bird className="h-4 w-4" />
          <AlertTitle>{t("errors.not-enough-data-yet")}</AlertTitle>
          <AlertDescription>
            {t("errors.not-enough-data-yet-failing", { count: 0 })}
          </AlertDescription>
        </Alert>
      ) : (
        <DataTable columns={columns(colTranslations)} data={data} />
      )}
    </CardContent>
  );
}
