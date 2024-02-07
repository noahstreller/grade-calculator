import appGlobals from "@/lib/app.globals";
import Grade from "@/lib/entities/grade";
import { GradeAverage } from "@/lib/entities/gradeAverage";
import { round } from "@/lib/utils";
import useTranslation from "next-translate/useTranslation";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
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
        <div className="bg-transparent rounded-xl border-solid border-2 border-border p-3 backdrop-blur-[8px]">
          {Grade.doesGradePass(payload[0].value) ? (
            <p>
              <b>Grade: </b>
              <span className="text-green-400">{`${payload[0].value}`}</span>
            </p>
          ) : (
            <p>
              <b>Grade: </b>
              <span className="text-red-400">{`${payload[0].value}`}</span>
            </p>
          )}
          <p>
            <b>Subject: </b>
            {label
              ? data[Number(label)].getSubject()
              : data[Number(0)].getSubject()}
          </p>
          <p>
            <b>Date: </b>
            {label
              ? data[Number(label)].getDate().toLocaleString()
              : data[Number(0)].getDate().toLocaleString()}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="">
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
              />
              <Radar
                dataKey={subjectAverage}
                className="fill-foreground stroke-foreground stroke-2"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      ) : null}
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
