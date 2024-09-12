"use client";
import { columns } from "@/components/cards/failingGradesCard/columns";
import { DataTable } from "@/components/cards/failingGradesCard/data-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AverageWithSubject } from "@/types/types";
import { Bird } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FailingGradesCard({
  data,
}: {
  data: AverageWithSubject[];
}) {
  const t = useTranslations();
  const colTranslations = {
    grades: {
      subject: t("grades.subject"),
      grade: t("grades.grade"),
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("subjects.failing-subjects")}</CardTitle>
        <CardDescription>{t("subjects.failing-subjects-desc")}</CardDescription>
      </CardHeader>
      <CardContent>
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
    </Card>
  );
}
