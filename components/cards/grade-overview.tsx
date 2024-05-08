"use client";
import { ColoredGrade } from "@/components/colored-grade";
import { usePreferences } from "@/components/preferences-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardBoard } from "@/components/ui/cardboard";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GradeWithSubject } from "@/db/schema";
import {
  doesGradePass,
  getTotalGradeAverages,
} from "@/lib/services/notAsyncLogic";
import { cn, getDateOrTime, truncateText } from "@/lib/utils";
import { AverageWithSubject } from "@/types/types";
import { Bird, Check, ChevronsUpDown, FilterX } from "lucide-react";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { isMobile } from "react-device-detect";
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
}: {
  data: GradeWithSubject[];
  passingData: AverageWithSubject[];
  failingData: AverageWithSubject[];
}) {
  const { t } = useTranslation("common");
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
                  Grade
                </span>
                <ColoredGrade
                  grade={payload[0].value}
                  className="text-left font-bold"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  Subject
                </span>
                <span className="font-bold text-muted-foreground">
                  {label
                    ? truncateText(data[Number(label)].subjects.name!, 20).text
                    : truncateText(data[Number(0)].subjects.name!, 20).text}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  Date
                </span>
                <span className="font-bold text-muted-foreground">
                  {label
                    ? getDateOrTime(data[Number(label)].grades.date!)
                    : getDateOrTime(data[Number(0)].grades.date!)}
                </span>
              </div>
              <div className="flex flex-col col-span-2 text-wrap">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  Description
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
                  Grade
                </span>
                <ColoredGrade
                  grade={payload[0].value}
                  className="text-left font-bold"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  Subject
                </span>
                <span className="font-bold text-muted-foreground">
                  {label
                    ? truncateText(data[Number(label)].subjects.name!, 20).text
                    : truncateText(data[Number(0)].subjects.name!, 20).text}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  Date
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
    <Card>
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
              data={getGraphData().sort((a, b) => {
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
                    ? "Lower is better"
                    : "Higher is better"
                }
              />
              <ReferenceLine
                y={preferences.passingGrade!}
                label={
                  <Label
                    value="Passing Grade"
                    dx={isMobile ? 60 : 120}
                    opacity={0.8}
                    dy={
                      doesGradePass(
                        getTotalGradeAverages(getGraphData()),
                        preferences
                      )
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
                y={getTotalGradeAverages(getGraphData())}
                label={
                  <Label
                    value="Your Average"
                    opacity={0.6}
                    dx={isMobile ? -60 : -120}
                    z={0}
                    dy={
                      doesGradePass(
                        getTotalGradeAverages(getGraphData()),
                        preferences
                      )
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
        <Popover open={subjectsOpen} onOpenChange={setSubjectsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-full justify-between",
                !subject && "text-muted-foreground"
              )}
            >
              {subject ? (
                truncateText(subject ?? "", 35).text
              ) : (
                <>
                  <FilterX className="size-4 mr-2" /> Showing all subjects
                </>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 flex flex-row">
            <Command>
              <CommandInput placeholder={t("subjects.search")} />
              <ScrollArea className="h-fit max-h-[50vh] overflow-auto">
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setSubjectsOpen(false);
                      setSubject(null);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        null === subject ? "opacity-100" : "opacity-0"
                      )}
                    />
                    All Subjects
                  </CommandItem>

                  {getSubjects().map((mappedSubject) => (
                    <CommandItem
                      value={mappedSubject}
                      key={mappedSubject}
                      onSelect={() => {
                        setSubjectsOpen(false);
                        setSubject(mappedSubject);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          mappedSubject === subject
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {truncateText(mappedSubject, 35).text}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </Command>
          </PopoverContent>
        </Popover>
      </CardContent>
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
