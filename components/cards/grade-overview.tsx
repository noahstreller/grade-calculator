"use client";
import { ColoredGrade } from "@/components/colored-grade";
import { usePreferences } from "@/components/preferences-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardBoard } from "@/components/ui/cardboard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GradeWithSubject } from "@/db/schema";
import { useDevice } from "@/lib/hooks/useMediaQuery";
import {
  doesGradePass,
  getTotalGradeAverages,
} from "@/lib/services/notAsyncLogic";
import { getDateOrTime, round, truncateText } from "@/lib/utils";
import { Average, AverageWithSubject } from "@/types/types";
import { Bird } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Label,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function GradeOverview({
  data,
  passingData,
  failingData,
  className,
  animate = true,
}: {
  data: GradeWithSubject[];
  passingData: AverageWithSubject[];
  failingData: AverageWithSubject[];
  className?: string;
  animate?: boolean;
}) {
  const t = useTranslations();
  const preferences = usePreferences().preferences!;
  const [subject, setSubject] = useState<string | null>(null);
  const [subjectsOpen, setSubjectsOpen] = useState(false);

  let getGrade = (grade: GradeWithSubject) => {
    return grade.grades.value;
  };

  const getSubjects = () => {
    const nonUniqueSubjects = data.map((grade) => grade.subjects.name!);
    const uniqueSubjects = [...new Set(nonUniqueSubjects)];
    return uniqueSubjects;
  };

  const getGraphData = () => {
    if (subject === null) {
      return data;
    }
    return data.filter((grade) => grade.subjects.name === subject);
  };

  const isOverNinetyPercent = () => {
    let result =
      (100 / preferences.maximumGrade!) * getTotalGradeAverages(data);
    return result > 90;
  };

  const { isMobile } = useDevice();

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: any;
    payload?: any;
    label?: any;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm max-w-80">
          {data[Number(0)].grades.description ||
          data[Number(label)].grades.description ? (
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  {t("grades.grade")}
                </span>
                <ColoredGrade
                  grade={payload[0].value}
                  className="text-left font-bold"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  {t("subjects.subject")}
                </span>
                <span className="font-bold text-muted-foreground text-wrap break-words">
                  {label
                    ? truncateText(data[Number(label)].subjects.name!, 25).text
                    : truncateText(data[Number(0)].subjects.name!, 25).text}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  {t("grades.date")}
                </span>
                <span className="font-bold text-muted-foreground">
                  {label
                    ? getDateOrTime(data[Number(label)].grades.date!)
                    : getDateOrTime(data[Number(0)].grades.date!)}
                </span>
              </div>
              <div className="flex flex-col col-span-2 text-wrap">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  {t("grades.description")}
                </span>
                <div className="font-bold text-muted-foreground text-wrap whitespace-normal break-words lg:max-w-full">
                  {label
                    ? data[Number(label)].grades.description!
                    : data[Number(0)].grades.description!}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  {t("grades.grade")}
                </span>
                <ColoredGrade
                  grade={payload[0].value}
                  className="text-left font-bold"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  {t("subjects.subject")}
                </span>
                <span className="font-bold text-muted-foreground text-wrap break-words">
                  {label
                    ? truncateText(data[Number(label)].subjects.name!, 25).text
                    : truncateText(data[Number(0)].subjects.name!, 25).text}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  {t("grades.date")}
                </span>
                <span className="font-bold text-muted-foreground">
                  {label
                    ? getDateOrTime(data[Number(label)].grades.date!)
                    : getDateOrTime(data[Number(0)].grades.date!)}
                </span>
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t("overview.title")}</CardTitle>
        <CardDescription>{t("overview.description")}</CardDescription>
      </CardHeader>
      {data.length === 0 ? (
        <CardContent>
          <Alert>
            <Bird className="h-4 w-4" />
            <AlertTitle>{t("errors.not-enough-data-yet")}</AlertTitle>
            <AlertDescription>
              {t("errors.not-enough-data-yet-desc", { count: 1 })}
            </AlertDescription>
          </Alert>
        </CardContent>
      ) : (
        <CardContent className="w-full h-72 max-h-fit">
          <ResponsiveContainer>
            <LineChart
              data={data.sort((a, b) => {
                return (
                  new Date(a.grades.date!).getTime() -
                  new Date(b.grades.date!).getTime()
                );
              })}
            >
              <Line
                dataKey={getGrade}
                stroke="#000000"
                className="dark:invert"
                isAnimationActive={animate}
                z={10}
              />
              <Tooltip content={<CustomTooltip />} />
              <YAxis
                tickCount={6}
                domain={[preferences.minimumGrade!, preferences.maximumGrade!]}
              />
              <XAxis
                tick={false}
                label={
                  preferences.passingInverse
                    ? t("overview.lower-is-better")
                    : t("overview.higher-is-better")
                }
              />
              <ReferenceLine
                y={preferences.passingGrade!}
                label={
                  <Label
                    value={
                      isMobile
                        ? t("overview.passing-short")
                        : t("overview.passing-long")
                    }
                    dx={isMobile ? 50 : 100}
                    opacity={0.8}
                    dy={
                      doesGradePass(getTotalGradeAverages(data), preferences)
                        ? 10
                        : -10
                    }
                  />
                }
                strokeDasharray="3 5"
                stroke="grey"
                z={0}
              />
              <ReferenceLine
                y={getTotalGradeAverages(data)}
                label={
                  <Label
                    value={
                      isMobile
                        ? t("overview.you-short")
                        : t("overview.you-long")
                    }
                    opacity={0.6}
                    dx={isMobile ? -50 : -100}
                    z={0}
                    dy={
                      doesGradePass(getTotalGradeAverages(data), preferences)
                        ? isOverNinetyPercent()
                          ? 10
                          : -10
                        : 10
                    }
                    fill={
                      doesGradePass(getTotalGradeAverages(data), preferences)
                        ? "#4ade80"
                        : "#f87171"
                    }
                  />
                }
                strokeDasharray="10 4"
                stroke={
                  doesGradePass(getTotalGradeAverages(data), preferences)
                    ? "#4ade80"
                    : "#f87171"
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      )}
      <CardContent>
        <CardBoard>
          <CardBoard row>
            <Card>
              <CardHeader>{t("subjects.passing-subjects")}</CardHeader>
              <CardContent>
                {passingData.filter(
                  (gradeAverage) => gradeAverage.average?.passing
                ).length > 0 ? (
                  <b className="block text-5xl text-center items-center self-center text-green-400">
                    {
                      passingData.filter(
                        (gradeAverage) => gradeAverage.average?.passing
                      ).length
                    }
                  </b>
                ) : (
                  <b className="block text-5xl text-center items-center self-center text-gray-400">
                    -
                  </b>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>{t("subjects.failing-subjects")}</CardHeader>
              <CardContent>
                {failingData.filter(
                  (gradeAverage) => !gradeAverage.average?.passing
                ).length > 0 ? (
                  <b className="block text-5xl text-center items-center self-center text-red-400">
                    {
                      failingData.filter(
                        (gradeAverage) => !gradeAverage.average?.passing
                      ).length
                    }
                  </b>
                ) : (
                  <b className="block text-5xl text-center items-center self-center text-gray-400">
                    -
                  </b>
                )}
              </CardContent>
            </Card>
          </CardBoard>
          <CardBoard row>
            <Card>
              <CardHeader>{t("grades.passing-grades")}</CardHeader>
              <CardContent>
                {data.filter((grade) =>
                  doesGradePass(grade.grades.value!, preferences)
                ).length > 0 ? (
                  <b className="block text-5xl text-center items-center self-center text-green-400">
                    {
                      data.filter((grade) =>
                        doesGradePass(grade.grades.value!, preferences)
                      ).length
                    }
                  </b>
                ) : (
                  <b className="block text-5xl text-center items-center self-center text-gray-400">
                    -
                  </b>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>{t("grades.failing-grades")}</CardHeader>
              <CardContent>
                {data.filter(
                  (grade) => !doesGradePass(grade.grades.value!, preferences)
                ).length > 0 ? (
                  <b className="block text-5xl text-center items-center self-center text-red-400">
                    {
                      data.filter(
                        (grade) =>
                          !doesGradePass(grade.grades.value!, preferences)
                      ).length
                    }
                  </b>
                ) : (
                  <b className="block text-5xl text-center items-center self-center text-gray-400">
                    -
                  </b>
                )}
              </CardContent>
            </Card>
          </CardBoard>
        </CardBoard>
      </CardContent>
    </Card>
  );
}

export function GradeOverviewForSubject({
  data,
  averageData,
  className,
  animate = true,
}: {
  data: GradeWithSubject[];
  averageData: Average;
  className?: string;
  animate?: boolean;
}) {
  const t = useTranslations();
  const preferences = usePreferences().preferences!;

  let getGrade = (grade: GradeWithSubject) => {
    return grade.grades.value;
  };

  const isOverNinetyPercent = () => {
    let result =
      (100 / preferences.maximumGrade!) * getTotalGradeAverages(data);
    return result > 90;
  };

  const { isMobile } = useDevice();

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: any;
    payload?: any;
    label?: any;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm max-w-80">
          {data[Number(0)].grades.description ||
          data[Number(label)].grades.description ? (
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  {t("grades.grade")}
                </span>
                <ColoredGrade
                  grade={payload[0].value}
                  className="text-left font-bold"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  {t("subjects.subject")}
                </span>
                <span className="font-bold text-muted-foreground text-wrap break-words">
                  {label
                    ? truncateText(data[Number(label)].subjects.name!, 25).text
                    : truncateText(data[Number(0)].subjects.name!, 25).text}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  {t("grades.date")}
                </span>
                <span className="font-bold text-muted-foreground">
                  {label
                    ? getDateOrTime(data[Number(label)].grades.date!)
                    : getDateOrTime(data[Number(0)].grades.date!)}
                </span>
              </div>
              <div className="flex flex-col col-span-2 text-wrap">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  {t("grades.description")}
                </span>
                <div className="font-bold text-muted-foreground text-wrap whitespace-normal break-words lg:max-w-full">
                  {label
                    ? data[Number(label)].grades.description!
                    : data[Number(0)].grades.description!}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  {t("grades.grade")}
                </span>
                <ColoredGrade
                  grade={payload[0].value}
                  className="text-left font-bold"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  {t("subjects.subject")}
                </span>
                <span className="font-bold text-muted-foreground text-wrap break-words">
                  {label
                    ? truncateText(data[Number(label)].subjects.name!, 25).text
                    : truncateText(data[Number(0)].subjects.name!, 25).text}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  {t("grades.date")}
                </span>
                <span className="font-bold text-muted-foreground">
                  {label
                    ? getDateOrTime(data[Number(label)].grades.date!)
                    : getDateOrTime(data[Number(0)].grades.date!)}
                </span>
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t("overview.title")}</CardTitle>
        <CardDescription>{t("overview.subject-description")} </CardDescription>
      </CardHeader>
      {data.length === 0 ? (
        <CardContent>
          <Alert>
            <Bird className="h-4 w-4" />
            <AlertTitle>{t("errors.not-enough-data-yet")}</AlertTitle>
            <AlertDescription>
              {t("errors.not-enough-data-yet-desc", { count: 1 })}
            </AlertDescription>
          </Alert>
        </CardContent>
      ) : (
        <CardContent className="w-full h-72 max-h-fit">
          <ResponsiveContainer>
            <LineChart
              data={data.sort((a, b) => {
                return (
                  new Date(a.grades.date!).getTime() -
                  new Date(b.grades.date!).getTime()
                );
              })}
            >
              <Line
                dataKey={getGrade}
                stroke="#000000"
                className="dark:invert"
                isAnimationActive={animate}
                z={10}
              />
              <Tooltip content={<CustomTooltip />} />
              <YAxis
                tickCount={6}
                domain={[preferences.minimumGrade!, preferences.maximumGrade!]}
              />
              <XAxis
                tick={false}
                label={
                  preferences.passingInverse
                    ? t("overview.lower-is-better")
                    : t("overview.higher-is-better")
                }
              />
              <ReferenceLine
                y={preferences.passingGrade!}
                label={
                  <Label
                    value={
                      isMobile
                        ? t("overview.passing-short")
                        : t("overview.passing-long")
                    }
                    dx={isMobile ? 50 : 100}
                    opacity={0.8}
                    dy={
                      doesGradePass(getTotalGradeAverages(data), preferences)
                        ? 10
                        : -10
                    }
                  />
                }
                strokeDasharray="3 5"
                stroke="grey"
                z={0}
              />
              <ReferenceLine
                y={getTotalGradeAverages(data)}
                label={
                  <Label
                    value={
                      isMobile
                        ? t("overview.you-short")
                        : t("overview.you-long")
                    }
                    opacity={0.6}
                    dx={isMobile ? -50 : -100}
                    z={0}
                    dy={
                      doesGradePass(getTotalGradeAverages(data), preferences)
                        ? isOverNinetyPercent()
                          ? 10
                          : -10
                        : 10
                    }
                    fill={
                      doesGradePass(getTotalGradeAverages(data), preferences)
                        ? "#4ade80"
                        : "#f87171"
                    }
                  />
                }
                strokeDasharray="10 4"
                stroke={
                  doesGradePass(getTotalGradeAverages(data), preferences)
                    ? "#4ade80"
                    : "#f87171"
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      )}
      <CardContent>
        <CardBoard>
          <CardBoard row>
            <Card>
              <CardHeader>{t("grades.passing-grades")}</CardHeader>
              <CardContent>
                {data.filter((grade) =>
                  doesGradePass(grade.grades.value!, preferences)
                ).length > 0 ? (
                  <b className="block text-5xl text-center items-center self-center text-green-400">
                    {
                      data.filter((grade) =>
                        doesGradePass(grade.grades.value!, preferences)
                      ).length
                    }
                  </b>
                ) : (
                  <b className="block text-5xl text-center items-center self-center text-gray-400">
                    -
                  </b>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>{t("grades.failing-grades")}</CardHeader>
              <CardContent>
                {data.filter(
                  (grade) => !doesGradePass(grade.grades.value!, preferences)
                ).length > 0 ? (
                  <b className="block text-5xl text-center items-center self-center text-red-400">
                    {
                      data.filter(
                        (grade) =>
                          !doesGradePass(grade.grades.value!, preferences)
                      ).length
                    }
                  </b>
                ) : (
                  <b className="block text-5xl text-center items-center self-center text-gray-400">
                    -
                  </b>
                )}
              </CardContent>
            </Card>
          </CardBoard>
          <Card>
            <CardHeader className="flex-row gap-3">
              {t("overview.subject-average-title")}
              <Popover>
                <PopoverTrigger>
                  <Badge variant="outline">{t("generic.help-icon")}</Badge>
                </PopoverTrigger>
                <PopoverContent>
                  {t("overview.subject-average-grade")}
                </PopoverContent>
              </Popover>
            </CardHeader>
            <CardContent>
              {averageData.gradeAverage === 0 || !averageData.gradeAverage ? (
                <b className="block text-5xl text-center items-center self-center text-gray-400">
                  -
                </b>
              ) : doesGradePass(averageData.gradeAverage, preferences) ? (
                <b className="block text-5xl text-center items-center self-center text-green-400">
                  {round(averageData.gradeAverage, 2)}
                </b>
              ) : (
                <b className="block text-5xl text-center items-center self-center text-red-400">
                  {round(averageData.gradeAverage, 2)}
                </b>
              )}
            </CardContent>
          </Card>
        </CardBoard>
      </CardContent>
    </Card>
  );
}
