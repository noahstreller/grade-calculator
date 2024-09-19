"use client";
import { usePreferences } from "@/components/preferences-provider";
import { SubjectGradeBadge } from "@/components/subject-grade-badge";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/card-stack";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Subject } from "@/db/schema";
import { useDevice } from "@/lib/hooks/useMediaQuery";
import { doesGradePass } from "@/lib/services/notAsyncLogic";
import { round, truncateText } from "@/lib/utils";
import { Average, AverageWithSubject } from "@/types/types";
import { Bird } from "lucide-react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations();
  const preferences = usePreferences().preferences;

  const { isMobile } = useDevice();

  const getRequiredGradeToPass = (
    average: AverageWithSubject
  ): { result: number; overflowCounts: number } => {
    if (
      preferences?.maximumGrade === preferences?.passingGrade ||
      (preferences?.minimumGrade === preferences?.passingGrade &&
        preferences?.passingInverse)
    )
      return { result: Infinity, overflowCounts: Infinity };
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
        {t("grades.simulatedWeight-part1")}{" "}
        <Highlight colorName="yellow">{simulatedWeight}</Highlight>
        {t("grades.simulatedWeight-part2")}
      </h2>
      {chunkPairs.length === 0 ? (
        <Alert>
          <Bird className="h-4 w-4" />
          <AlertTitle>{t("errors.no-data-yet")}</AlertTitle>
          {showPassing ? (
            <AlertDescription>{t("errors.no-data-yet-desc")}</AlertDescription>
          ) : (
            <AlertDescription>
              {t("errors.not-enough-subjects-yet-failing")}
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
                      {preferences?.passingInverse
                        ? t("generic.less-than")
                        : t("generic.greater-than")}
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
  className = "",
  showPassingGrades = false,
}: {
  averageData: AverageWithSubject[];
  className?: string;
  showPassingGrades?: boolean;
}) {
  const t = useTranslations();
  const [showPassing, setShowPassing] = useState<boolean>(showPassingGrades);
  const [simulatedWeight, setSimulatedWeight] = useState<number | undefined>();

  const getSimulatedWeight = () => {
    if (!simulatedWeight) return { simulatedWeight: 1, valid: true };
    if (simulatedWeight < 0) return { simulatedWeight: 1, valid: false };
    return { simulatedWeight, valid: true };
  };

  return (
    <Card className={className}>
      <CardHeader className="flex-row justify-between">
        <div>
          <CardTitle>{t("required-grades.title")}</CardTitle>
          <CardDescription>{t("required-grades.description")}</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Switch checked={showPassing} onCheckedChange={setShowPassing} />
          <Label>
            {t("grades.show-passing-grades-part1")}
            <span className="text-green-400">
              {t("grades.show-passing-grades-part2")}
            </span>
            {t("grades.show-passing-grades-part3")}
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
          {t("grades.simulatedWeight-description")}
        </CardDescription>
        <div className="flex flex-row gap-3 max-w-full">
          <Input
            value={simulatedWeight || ""}
            type="number"
            onChange={(e) => {
              setSimulatedWeight(Number(e.target.value));
            }}
            placeholder={t("required-grades.simulated-weight")}
            className=" flex-shrink-1"
          />
          <Button
            variant="outline"
            className="flex-shrink-0"
            onClick={() => {
              setSimulatedWeight(undefined);
            }}
          >
            {t("actions.reset")}
          </Button>
        </div>
        {!getSimulatedWeight().valid && (
          <span className="text-red-400 text-xs">
            {t("errors.must-be-positive")}
          </span>
        )}
      </CardContent>
    </Card>
  );
}

function RequiredGradesBodyForSubject({
  averageData,
  simulatedWeight,
  subject,
}: {
  averageData: Average;
  simulatedWeight: number;
  subject: Subject;
}) {
  const t = useTranslations();
  const preferences = usePreferences().preferences;

  const { isMobile } = useDevice();

  const getRequiredGradeToPass = (
    average: Average
  ): { result: number; overflowCounts: number } => {
    if (
      preferences?.maximumGrade === preferences?.passingGrade ||
      (preferences?.minimumGrade === preferences?.passingGrade &&
        preferences?.passingInverse)
    )
      return { result: Infinity, overflowCounts: Infinity };
    let sum = average.gradeWeightedSum!;
    let weight = simulatedWeight;
    let count = average.gradeWeightedAmount! + weight;
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
  return (
    <CardBoard>
      <h2>
        {t("grades.simulatedWeight-part1")}
        <Highlight colorName="yellow">{simulatedWeight}</Highlight>
        {t("grades.simulatedWeight-part2")}
      </h2>
      <Card>
        <CardHeader>
          <h2>
            {subject &&
            doesGradePass(averageData?.gradeAverage!, preferences!) ? (
              <b className="text-green-400 mr-2">
                {truncateForPage(subject.name)}
              </b>
            ) : (
              <b className="text-red-400 mr-2">
                {truncateForPage(subject.name)}
              </b>
            )}
            <SubjectGradeBadge average={{ average: averageData, subject }} />
          </h2>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl text-gray-400">
            <span className="text-muted-foreground text-4xl">
              {preferences?.passingInverse
                ? t("generic.less-than")
                : t("generic.greater-than")}
            </span>
            <b className="text-5xl text-foreground">
              {round(getRequiredGradeToPass(averageData).result, 2)}
            </b>
            {getRequiredGradeToPass(averageData).overflowCounts != 0
              ? getGradeOverflowString(
                  getRequiredGradeToPass(averageData).overflowCounts
                )
              : null}
            <br />
            {doesGradePass(averageData.gradeAverage!, preferences!)
              ? t("required-grades.passed")
              : t("required-grades.required")}
          </h1>
        </CardContent>
      </Card>
    </CardBoard>
  );
}

export function RequiredGradesForSubject({
  averageData,
  subject,
  className = "",
  showPassingGrades = false,
}: {
  averageData: Average;
  subject: Subject;
  className?: string;
  showPassingGrades?: boolean;
}) {
  const t = useTranslations();
  const [showPassing, setShowPassing] = useState<boolean>(showPassingGrades);
  const [simulatedWeight, setSimulatedWeight] = useState<number | undefined>();

  const getSimulatedWeight = () => {
    if (!simulatedWeight) return { simulatedWeight: 1, valid: true };
    if (simulatedWeight < 0) return { simulatedWeight: 1, valid: false };
    return { simulatedWeight, valid: true };
  };

  return (
    <Card className={className}>
      <CardHeader className="flex-row justify-between">
        <div>
          <CardTitle>{t("required-grades.title")}</CardTitle>
          <CardDescription>{t("required-grades.description")}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <RequiredGradesBodyForSubject
          averageData={averageData}
          subject={subject}
          simulatedWeight={getSimulatedWeight().simulatedWeight}
        />
        <CardDescription className="mt-4 mx-1">
          {t("grades.simulatedWeight-description")}
        </CardDescription>
        <div className="flex flex-row gap-3 max-w-full">
          <Input
            value={simulatedWeight || ""}
            type="number"
            onChange={(e) => {
              setSimulatedWeight(Number(e.target.value));
            }}
            placeholder={t("required-grades.simulated-weight")}
            className=" flex-shrink-1"
          />
          <Button
            variant="outline"
            className="flex-shrink-0"
            onClick={() => {
              setSimulatedWeight(undefined);
            }}
          >
            {t("actions.reset")}
          </Button>
        </div>
        {!getSimulatedWeight().valid && (
          <span className="text-red-400 text-xs">
            {t("errors.must-be-positive")}
          </span>
        )}
      </CardContent>
    </Card>
  );
}
