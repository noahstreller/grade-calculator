"use client";
import { AverageWithSubject } from "@/types/types";
import useTranslation from "next-translate/useTranslation";

export default function FailingGradesCard({
  data,
  setData,
}: {
  data: AverageWithSubject[];
  setData: Function;
}) {
  const { t } = useTranslation("common");

  return (
    // <Card>
    //   <CardHeader>
    //     <CardTitle>{t("subjects.failing-subjects")}</CardTitle>
    //     <CardDescription>{t("subjects.failing-subjects-desc")}</CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     {data.length === 0 ? (
    //       <Alert>
    //         <Bird className="h-4 w-4" />
    //         <AlertTitle>{t("errors.not-enough-data-yet")}</AlertTitle>
    //         <AlertDescription>
    //           {t("errors.not-enough-data-yet-failing", { count: 0 })}
    //         </AlertDescription>
    //       </Alert>
    //     ) : (
    //       <DataTable columns={columns()} data={data} />
    //     )}
    //   </CardContent>
    // </Card>
    <div>
      <h1>Test</h1>
    </div>
  );
}
