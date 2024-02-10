"use client";
import appGlobals from "@/lib/app.globals";
import Grade from "@/lib/entities/grade";
import { GradeAverage } from "@/lib/entities/gradeAverage";
import Subjects from "@/lib/entities/subject";
import { round } from "@/lib/utils";
import { Bird } from "lucide-react";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CardBoard } from "../ui/cardboard";

function RequiredGradesBody({
  gradeData,
  averageData,
}: {
  gradeData: Grade[];
  averageData: GradeAverage[];
}) {
  const { t } = useTranslation("common");
  const chunkIntoPieces = (data: Array<any>, amount: number = 2) => {
    const result = [];
    for (let i = 0; i < data.length; i += amount) {
      result.push(data.slice(i, i + amount));
    }
    return result;
  };

  const getRequiredGradeToPass = (
    average: GradeAverage
  ): { result: number; overflowCounts: number } => {
    let sum = 0;
    let count = 1;
    let passing = appGlobals.passingGrade;
    let max = appGlobals.maximumGrade;
    let min = appGlobals.minimumGrade;
    let result = 0;
    let overflowCounts = 0;
    for (let grade of average.grades) {
      sum += grade.getValue();
      count++;
    }
    result = passing * count - sum;
    while (result > max || result < min) {
      count++;
      if (result > max) sum += max;
      if (result < min) sum += min;
      result = passing * count - sum;
      if (result > max) overflowCounts++;
      if (result < min) overflowCounts--;
    }
    return { result, overflowCounts };
  };

  const getGradeOverflowString = (overflowCounts: number ) => {
    let result = "";
    if(overflowCounts < 0){
      for (let i = 0; i >= overflowCounts; i--) {
        if (appGlobals.passingInverse) result += ` + ${appGlobals.maximumGrade}`;
        else result += ` + ${appGlobals.minimumGrade}`;
      }
      return result;
    }

    for (let i = 0; i < overflowCounts; i++) {
      if (appGlobals.passingInverse) result += ` + ${appGlobals.minimumGrade}`;
      else result += ` + ${appGlobals.maximumGrade}`;
    }
    return result;
  };

  const [chunkPairs, setChunkPairs] = useState<Array<any>>([]);

  useEffect(() => {
    setChunkPairs([...chunkIntoPieces(averageData)]);
  }, [averageData]);

  return (
    <CardBoard>
      {chunkPairs.length === 0 ? (
        <Alert>
          <Bird className="h-4 w-4" />
          <AlertTitle>{t("errors.no-data-yet")}</AlertTitle>
          <AlertDescription>{t("errors.no-data-yet-desc")}</AlertDescription>
        </Alert>
      ) : (
        chunkPairs.map((pair, index) => (
          <CardBoard row key={index}>
            {pair.map((average: GradeAverage, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <h2>
                    {average.subject &&
                    Subjects.doesSubjectPass(average.subject) ? (
                      <span className="text-green-400">{average.subject}</span>
                    ) : (
                      <span className="text-red-400">{average.subject}</span>
                    )}{" "}
                    <Badge variant="secondary">
                      {average.grades.length}{" "}
                      {t("grades.grades", { count: average.grades.length })}
                    </Badge>
                  </h2>
                </CardHeader>
                <CardContent>
                  <h1 className="text-2xl text-gray-400">
                    <b className="text-5xl text-foreground">
                      {round(getRequiredGradeToPass(average).result, 2)}
                    </b>
                    {getRequiredGradeToPass(average).overflowCounts != 0
                      ? getGradeOverflowString(
                          getRequiredGradeToPass(average).overflowCounts
                        )
                      : getRequiredGradeToPass(average).overflowCounts}
                    <br />
                    {Grade.doesGradeFailOrEqual(
                      getRequiredGradeToPass(average).result
                    )
                      ? t("required-grades.passed")
                      : t("required-grades.required")}
                  </h1>
                </CardContent>
              </Card>
            ))}
          </CardBoard>
        ))
      )}
    </CardBoard>
  );
}

export function RequiredGrades({
  gradeData,
  averageData,
}: {
  gradeData: Grade[];
  averageData: GradeAverage[];
}) {
  const { t } = useTranslation("common");
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("required-grades.title")}</CardTitle>
        <CardDescription>{t("required-grades.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <RequiredGradesBody gradeData={gradeData} averageData={averageData} />
      </CardContent>
    </Card>
  );
}
