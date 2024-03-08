import appGlobals from "@/lib/app.globals";
import Grade from "@/lib/entities/grade";
import { GradeAverage } from "@/lib/entities/gradeAverage";
import { round, truncateText } from "@/lib/utils";
import { Bird } from "lucide-react";
import useTranslation from "next-translate/useTranslation";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function AverageOverview({
  data,
  averageData,
}: {
  data: Grade[];
  averageData: GradeAverage[];
}) {
  const { t } = useTranslation("common");

  let getGrade = (grade: Grade) => {
    return grade.getValue();
  };

  let subjectAverage = (gradeAverage: GradeAverage) => {
    return gradeAverage.gradeAverage;
  };

  let averageSubject = (gradeAverage: GradeAverage) => {
    return gradeAverage.subject;
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
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Grade
              </span>
              {Grade.doesGradePass(payload[0].value) ? (
                <span className="text-green-400 font-bold">{`${payload[0].value}`}</span>
              ) : (
                <span className="text-red-400 font-bold">{`${payload[0].value}`}</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Subject
              </span>
              <span className="font-bold text-muted-foreground">
                {truncateText(payload[0].payload.subject, 20).text}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Grade Count
              </span>
              <span className="font-bold text-muted-foreground">
                {payload[0].payload.grades.length}
              </span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("subject-overview.title")}</CardTitle>
        <CardDescription>{t("subject-overview.description")}</CardDescription>
      </CardHeader>
      {averageData.length >= 3 ? (
        <CardContent className="w-full h-72">
          <ResponsiveContainer>
            <RadarChart innerRadius={10} data={averageData}>
              <PolarGrid />
              <PolarAngleAxis dataKey={averageSubject} />
              <PolarRadiusAxis
                tickCount={6}
                angle={0}
                domain={[appGlobals.minimumGrade, appGlobals.maximumGrade]}
                reversed={appGlobals.passingInverse}
              />
              <Radar
                dataKey={subjectAverage}
                className="fill-foreground stroke-foreground stroke-2"
                fillOpacity={0.6}
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
        <CardBoard>
          <CardBoard column={false} className="flex-col sm:flex-row ">
            <Card>
              <CardHeader className="flex-row gap-3">
                {t("subject-overview.subject-average")}
                <Popover>
                  <PopoverTrigger>
                    <Badge variant="outline">?</Badge>
                  </PopoverTrigger>
                  <PopoverContent>
                    {t("subject-overview.subject-average-desc")}
                  </PopoverContent>
                </Popover>
              </CardHeader>
              <CardContent>
                {GradeAverage.getAverageFromGradeAverages(averageData)
                  .gradeAverage === 0 ? (
                  <b className="block text-5xl text-center items-center self-center text-gray-400">
                    -
                  </b>
                ) : Grade.doesGradePass(
                    GradeAverage.getAverageFromGradeAverages(averageData)
                      .gradeAverage
                  ) ? (
                  <b className="block text-5xl text-center items-center self-center text-green-400">
                    {round(
                      GradeAverage.getAverageFromGradeAverages(averageData)
                        .gradeAverage,
                      2
                    )}
                  </b>
                ) : (
                  <b className="block text-5xl text-center items-center self-center text-red-400">
                    {round(
                      GradeAverage.getAverageFromGradeAverages(averageData)
                        .gradeAverage,
                      2
                    )}
                  </b>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex-row gap-3">
                {t("subject-overview.grade-average")}
                <Popover>
                  <PopoverTrigger>
                    <Badge variant="outline">?</Badge>
                  </PopoverTrigger>
                  <PopoverContent>
                    {t("subject-overview.grade-average-desc")}
                  </PopoverContent>
                </Popover>
              </CardHeader>
              <CardContent>
                {GradeAverage.getAverageFromGrades(data).gradeAverage === 0 ? (
                  <b className="block text-5xl text-center items-center self-center text-gray-400">
                    -
                  </b>
                ) : Grade.doesGradePass(
                    GradeAverage.getAverageFromGrades(data).gradeAverage
                  ) ? (
                  <b className="block text-5xl text-center items-center self-center text-green-400">
                    {round(
                      GradeAverage.getAverageFromGrades(data).gradeAverage,
                      2
                    )}
                  </b>
                ) : (
                  <b className="block text-5xl text-center items-center self-center text-red-400">
                    {round(
                      GradeAverage.getAverageFromGrades(data).gradeAverage,
                      2
                    )}
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
