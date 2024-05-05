import { columns } from "@/components/cards/failingGradesCard/columns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { AverageWithSubject } from "@/types/types";
import { Bird } from "lucide-react";
import useTranslation from "next-translate/useTranslation";

export function FailingGradesContent({ data }: { data: AverageWithSubject[] }) {
  const { t } = useTranslation("common");
  return (
    <CardContent className="mt-5">
      <CardTitle>Subjects to revise</CardTitle>
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
        <DataTable columns={columns()} data={data} />
      )}
    </CardContent>
  );
}
