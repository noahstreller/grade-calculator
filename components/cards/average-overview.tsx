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
import {
  doesGradePass,
  getSubjectAverages,
  getTotalGradeAverages,
} from "@/lib/services/notAsyncLogic";
import { round, truncateText } from "@/lib/utils";
import { AverageWithSubject } from "@/types/types";
import { Bird } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export function AverageOverview({
  data,
  averageData,
  className,
  animate = true,
}: {
  data: GradeWithSubject[];
  averageData: AverageWithSubject[];
  className?: string;
  animate?: boolean;
}) {
  const t = useTranslations();
  const preferences = usePreferences().preferences!;

  let subjectAverage = (gradeAverage: AverageWithSubject) => {
    return gradeAverage.average?.gradeAverage!;
  };

  let averageSubject = (gradeAverage: AverageWithSubject) => {
    return gradeAverage.subject.name!;
  };

  const subjectAverages = getSubjectAverages(averageData);
  const gradeAverages = getTotalGradeAverages(data);

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
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                {t("grades.grade")}
              </span>
              <ColoredGrade
                className="text-left font-bold"
                grade={payload[0].payload.average.gradeAverage}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                {t("subjects.subject")}
              </span>
              <span className="font-bold text-muted-foreground">
                {truncateText(payload[0].payload.subject.name, 20).text}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                {t("subjects.grade-count")}
              </span>
              <span className="font-bold text-muted-foreground">
                {payload[0].payload.average.gradeAmount}
              </span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t("subject-overview.title")}</CardTitle>
        <CardDescription>{t("subject-overview.description")}</CardDescription>
      </CardHeader>
      {averageData.filter(
        (average) =>
          average.average?.gradeAmount && average.average?.gradeAmount !== 0
      ).length >= 3 ? (
        <CardContent className="w-full h-72">
          <ResponsiveContainer>
            <RadarChart
              innerRadius={10}
              data={averageData.filter(
                (average) =>
                  average.average?.gradeAmount &&
                  average.average?.gradeAmount !== 0
              )}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey={averageSubject} />
              <PolarRadiusAxis
                tickCount={6}
                angle={0}
                domain={[preferences.minimumGrade!, preferences.maximumGrade!]}
                reversed={preferences.passingInverse!}
              />
              <Radar
                dataKey={subjectAverage}
                className="fill-foreground stroke-foreground stroke-2"
                fillOpacity={0.6}
                isAnimationActive={animate}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      ) : (
        <CardContent>
          <Alert>
            <Bird className="h-4 w-4" />
            <AlertTitle>{t("errors.not-enough-data-yet")}</AlertTitle>
            <AlertDescription>
              {t("errors.not-enough-data-yet-desc", { count: 3 })}
            </AlertDescription>
          </Alert>
        </CardContent>
      )}
      <CardContent>
        {subjectAverages === gradeAverages ? (
          <Card className="outline outline-border outline-4">
            <CardHeader className="flex-row gap-3 font-bold">
              {t("overview.you-long")}
              <Popover>
                <PopoverTrigger>
                  <Badge variant="outline">{t("generic.help-icon")}</Badge>
                </PopoverTrigger>
                <PopoverContent>{t("overview.total-average")} </PopoverContent>
              </Popover>
            </CardHeader>
            <CardContent>
              {subjectAverages === 0 || !subjectAverages ? (
                <b className="block text-5xl text-center items-center self-center text-gray-400">
                  -
                </b>
              ) : doesGradePass(subjectAverages, preferences) ? (
                <b className="underline decoration-double block text-5xl text-center items-center self-center text-green-400">
                  {round(subjectAverages, 2)}
                </b>
              ) : (
                <b className="underline decoration-double block text-5xl text-center items-center self-center text-red-400">
                  {round(subjectAverages, 2)}
                </b>
              )}
            </CardContent>
          </Card>
        ) : (
          <CardBoard>
            <CardBoard className="flex-col sm:flex-row ">
              <Card className="outline outline-border outline-4">
                <CardHeader className="flex-row gap-3">
                  {t("subject-overview.subject-average")}
                  <Popover>
                    <PopoverTrigger>
                      <Badge variant="outline">{t("generic.help-icon")}</Badge>
                    </PopoverTrigger>
                    <PopoverContent>
                      {t("subject-overview.subject-average-desc")}
                    </PopoverContent>
                  </Popover>
                </CardHeader>
                <CardContent>
                  {subjectAverages === 0 || !subjectAverages ? (
                    <b className="block text-5xl text-center items-center self-center text-gray-400">
                      -
                    </b>
                  ) : doesGradePass(subjectAverages, preferences) ? (
                    <b className="underline decoration-double block text-5xl text-center items-center self-center text-green-400">
                      {round(subjectAverages, 2)}
                    </b>
                  ) : (
                    <b className="underline decoration-double block text-5xl text-center items-center self-center text-red-400">
                      {round(subjectAverages, 2)}
                    </b>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex-row gap-3">
                  {t("subject-overview.grade-average")}
                  <Popover>
                    <PopoverTrigger>
                      <Badge variant="outline">{t("generic.help-icon")}</Badge>
                    </PopoverTrigger>
                    <PopoverContent>
                      {t("subject-overview.grade-average-desc")}
                    </PopoverContent>
                  </Popover>
                </CardHeader>
                <CardContent>
                  {gradeAverages === 0 ? (
                    <b className="block text-5xl text-center items-center self-center text-gray-400">
                      -
                    </b>
                  ) : doesGradePass(gradeAverages, preferences) ? (
                    <b className="block text-5xl text-center items-center self-center text-green-400">
                      {round(gradeAverages, 2)}
                    </b>
                  ) : (
                    <b className="block text-5xl text-center items-center self-center text-red-400">
                      {round(gradeAverages, 2)}
                    </b>
                  )}
                </CardContent>
              </Card>
            </CardBoard>
          </CardBoard>
        )}
      </CardContent>
    </Card>
  );
}
