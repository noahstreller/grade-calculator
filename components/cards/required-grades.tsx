"use client";
import { usePreferences } from "@/components/preferences-provider";
import { SubjectGradeBadge } from "@/components/subject-grade-badge";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/card-stack";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MediaQueries, useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { doesGradePass } from "@/lib/services/notAsyncLogic";
import { round, truncateText } from "@/lib/utils";
import { AverageWithSubject } from "@/types/types";
import { Bird } from "lucide-react";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CardBoard } from "../ui/cardboard";

function RequiredGradesBody({
  averageData,
  showPassing,
  simulatedWeight,
}: {
  averageData: AverageWithSubject[];
  showPassing: boolean;
  simulatedWeight: number;
}) {
  const { t } = useTranslation("common");
  const preferences = usePreferences().preferences;

  const isDesktop = useMediaQuery(MediaQueries.xxl);
  const isTablet = useMediaQuery(MediaQueries.xl) && !isDesktop;
  const isMobile = !isTablet && !isDesktop;

  const getRequiredGradeToPass = (
    average: AverageWithSubject
  ): { result: number; overflowCounts: number } => {
    let sum = average.average?.gradeWeightedSum!;
    let weight = simulatedWeight;
    let count = average.average?.gradeWeightedAmount! + weight;
    let passing = preferences?.passingGrade!;
    let max = preferences?.maximumGrade!;
    let min = preferences?.minimumGrade!;
    let result = (passing * count - sum) / weight;
    let overflowCounts = 0;
    while (result > max || result < min) {
      count++;
      if (result > max) {
        sum += max;
        overflowCounts++;
      } else {
        sum += min;
        overflowCounts--;
      }
      result = (passing * count - sum) / weight;
    }
    return { result, overflowCounts };
  };

  const getGradeOverflowString = (overflowCounts: number) => {
    let result = "";
    if (overflowCounts < 0) {
      if (overflowCounts < -10)
        return ` + ${-overflowCounts} × ${preferences?.minimumGrade}`;
      for (let i = 0; i > overflowCounts; i--) {
        result += ` + ${preferences?.minimumGrade}`;
      }
      return result;
    }

    if (overflowCounts > 10)
      return ` + ${overflowCounts} × ${preferences?.maximumGrade}`;
    for (let i = 0; i < overflowCounts; i++) {
      result += ` + ${preferences?.maximumGrade}`;
    }
    return result;
  };

  const truncateForPage = (subject: string | null): string => {
    if (subject === null) return "";
    return truncateText(subject, 20).text;
  };

  const [chunkPairs, setChunkPairs] = useState<Array<any>>([]);

  useEffect(() => {
    const chunkIntoPieces = (data: Array<any>, amount: number = 2) => {
      let filteredData = data.filter((average) => shouldBeShown(average));
      let result = [];
      for (let i = 0; i < filteredData.length; i += amount) {
        result.push(filteredData.slice(i, i + amount));
      }
      return result;
    };

    const shouldBeShown = (average: AverageWithSubject) => {
      return (
        (doesGradePass(average.average?.gradeAverage!, preferences!) ===
          false ||
          showPassing) &&
        average.average
      );
    };

    setChunkPairs([...chunkIntoPieces(averageData, isMobile ? 1 : 2)]);
  }, [averageData, isMobile, showPassing, preferences]);

  return (
    <CardBoard>
      <h2>
        If your next exam is weighted{" "}
        <Highlight colorName="yellow">{simulatedWeight}</Highlight>, you will
        need:
      </h2>
      {chunkPairs.length === 0 ? (
        <Alert>
          <Bird className="h-4 w-4" />
          <AlertTitle>{t("errors.no-data-yet")}</AlertTitle>
          {showPassing ? (
            <AlertDescription>{t("errors.no-data-yet-desc")}</AlertDescription>
          ) : (
            <AlertDescription>
              {t("errors.not-enough-subjects-yet-failing_0")}
            </AlertDescription>
          )}
        </Alert>
      ) : (
        chunkPairs.map((pair, index) => (
          <CardBoard row key={index}>
            {pair.map((average: AverageWithSubject, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <h2>
                    {average.subject &&
                    doesGradePass(
                      average.average?.gradeAverage!,
                      preferences!
                    ) ? (
                      <b className="text-green-400 mr-2">
                        {truncateForPage(average.subject.name)}
                      </b>
                    ) : (
                      <b className="text-red-400 mr-2">
                        {truncateForPage(average.subject.name)}
                      </b>
                    )}
                    <SubjectGradeBadge average={average} />
                  </h2>
                </CardHeader>
                <CardContent>
                  <h1 className="text-2xl text-gray-400">
                    <span className="text-muted-foreground text-4xl">
                      {preferences?.passingInverse ? "<" : ">"}
                    </span>
                    <b className="text-5xl text-foreground">
                      {round(getRequiredGradeToPass(average).result, 2)}
                    </b>
                    {getRequiredGradeToPass(average).overflowCounts != 0
                      ? getGradeOverflowString(
                          getRequiredGradeToPass(average).overflowCounts
                        )
                      : null}
                    <br />
                    {doesGradePass(average.average?.gradeAverage!, preferences!)
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
  averageData,
}: {
  averageData: AverageWithSubject[];
}) {
  const { t } = useTranslation("common");
  const [showPassing, setShowPassing] = useState<boolean>(false);
  const [simulatedWeight, setSimulatedWeight] = useState<number | undefined>();

  const getSimulatedWeight = () => {
    if (!simulatedWeight || simulatedWeight <= 0)
      return { simulatedWeight: 1, valid: false };
    return { simulatedWeight, valid: true };
  };

  return (
    <Card>
      <CardHeader className="flex-row justify-between">
        <div>
          <CardTitle>{t("required-grades.title")}</CardTitle>
          <CardDescription>{t("required-grades.description")}</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Switch checked={showPassing} onCheckedChange={setShowPassing} />
          <Label>
            Show <span className="text-green-400">passing</span> grades
          </Label>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <RequiredGradesBody
          averageData={averageData}
          showPassing={showPassing}
          simulatedWeight={getSimulatedWeight().simulatedWeight}
        />
        <CardDescription className="mt-4 mx-1">
          If you know the weight of the next exam, you can apply that weight to
          the required grades.
        </CardDescription>
        <div className="flex flex-row gap-3">
          <Input
            value={simulatedWeight || ""}
            type="number"
            onChange={(e) => {
              console.log("changed");
              setSimulatedWeight(e.target.valueAsNumber);
            }}
            placeholder="Simulated weight"
            className="w-[250px]"
          />
          <Button
            variant="outline"
            onClick={() => {
              setSimulatedWeight(undefined);
            }}
          >
            Clear
          </Button>
        </div>
        {!getSimulatedWeight().valid && (
          <span className="text-red-400 text-xs">
            Weight must be a positive number
          </span>
        )}
      </CardContent>
    </Card>
  );
}
