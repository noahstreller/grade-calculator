"use client";
import appGlobals from "@/lib/app.globals";
import Grade from "@/lib/entities/grade";
import { GradeAverage } from "@/lib/entities/gradeAverage";
import { round } from "@/lib/utils";
import { Bird } from "lucide-react";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { CardBoard } from "../ui/cardboard";

function RequiredGradesBody({
  gradeData,
  averageData,
}: {
  gradeData: Grade[];
  averageData: GradeAverage[];
}) {
  const {t} = useTranslation("common");
  const chunkIntoPieces = (data: Array<any>, amount: number = 2) => {
    const result = [];
    for (let i = 0; i < data.length; i += amount) {
      result.push(data.slice(i, i + amount));
    }
    return result;
  };

  const getRequiredGradeToPass = (
    average: GradeAverage
  ): { result: number; maxCounts: number } => {
    let sum = 0;
    let count = 1;
    let passing = appGlobals.passingGrade;
    let max = appGlobals.maximumGrade;
    let result = 0;
    let maxCounts = 0;
    for (let grade of average.grades) {
      sum += grade.getValue();
      count++;
    }
    result = passing * count - sum;
    while (result > max) {
      count++;
      sum += max;
      result = passing * count - sum;
      maxCounts++;
    }
    console.log(maxCounts);

    return { result, maxCounts };
  };

  const getMaxGradeOverflowString = (maxCounts: number) => {
    let result = "";
    for (let i = 0; i < maxCounts; i++) {
      result += ` + ${appGlobals.maximumGrade}`;
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
          <AlertDescription>
            {t("errors.no-data-yet-desc")}
          </AlertDescription>
        </Alert>
      ) : (
        chunkPairs.map((pair, index) => (
          <CardBoard row key={index}>
            {pair.map((average: GradeAverage, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <h2>
                    {average.subject}{" "}
                    <Badge variant="secondary">{average.grades.length} {t("grades.grades", {count: average.grades.length})}</Badge>
                  </h2>
                </CardHeader>
                <CardContent>
                  <h1 className="text-2xl text-gray-400"> 
                    <b className="text-5xl text-foreground">
                      {round(getRequiredGradeToPass(average).result, 2)}
                    </b>
                    {getRequiredGradeToPass(average).maxCounts > 0
                      ? getMaxGradeOverflowString(
                          getRequiredGradeToPass(average).maxCounts
                        )
                      : null}
                    <br />
                    {
                      getRequiredGradeToPass(average).result < appGlobals.passingGrade
                      ? t("required-grades.passed")
                      : t("required-grades.required")
                    }
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
  const {t} = useTranslation("common");
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
