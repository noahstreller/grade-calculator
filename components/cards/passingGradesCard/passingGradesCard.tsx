"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AverageWithSubject } from "@/types/types";
import { Bird } from "lucide-react";
import useTranslation from "next-translate/useTranslation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { DataTable } from "../../ui/data-table";
import { columns } from "./columns";

export default function PassingGradesCard({ data }: { data: AverageWithSubject[] }) {
  const { t } = useTranslation("common");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("subjects.passing-subjects")}</CardTitle>
        <CardDescription>{t("subjects.passing-subjects-desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <Alert>
            <Bird className="h-4 w-4" />
            <AlertTitle>{t("errors.not-enough-data-yet")}</AlertTitle>
            <AlertDescription>
              {t("errors.not-enough-data-yet-passing", { count: 0 })}
            </AlertDescription>
          </Alert>
        ) : (
          <DataTable columns={columns()} data={data} />
        )}
      </CardContent>
    </Card>
  );
}
