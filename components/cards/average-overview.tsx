import { ColoredGrade } from "@/components/colored-grade";
import { usePreferences } from "@/components/preferences-provider";
import { GradeWithSubject } from "@/db/schema";
import appGlobals from "@/lib/app.globals";
import { doesGradePass, getSubjectAverages, getTotalGradeAverages } from "@/lib/services/notAsyncLogic";
import { round, truncateText } from "@/lib/utils";
import { AverageWithSubject } from "@/types/types";
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
  data: GradeWithSubject[];
  averageData: AverageWithSubject[];
}) {
  const { t } = useTranslation("common");
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
    console.log(payload);
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Grade
              </span>
              <ColoredGrade noMargin grade={payload[0].payload.average.gradeAverage} />

            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Subject
              </span>
              <span className="font-bold text-muted-foreground">
                {truncateText(payload[0].payload.subject.name, 20).text}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Grade Count
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
                {subjectAverages === 0 ? (
                  <b className="block text-5xl text-center items-center self-center text-gray-400">
                    -
                  </b>
                ) : doesGradePass(subjectAverages, preferences) ? (
                  <b className="block text-5xl text-center items-center self-center text-green-400">
                    {round(subjectAverages, 2)}
                  </b>
                ) : (
                  <b className="block text-5xl text-center items-center self-center text-red-400">
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
                    <Badge variant="outline">?</Badge>
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
                ) : doesGradePass(
                    gradeAverages, preferences
                  ) ? (
                  <b className="block text-5xl text-center items-center self-center text-green-400">
                    {round(
                      gradeAverages,
                      2
                    )}
                  </b>
                ) : (
                  <b className="block text-5xl text-center items-center self-center text-red-400">
                    {round(
                      gradeAverages,
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
